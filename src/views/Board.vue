<template>
  <div>
    <h3 class="">{{ board ? board.title : "Tableau" }}</h3>

    <notifications style="margin-right: 20px !important; margin-top: 150px !important" group="data"/>

    <!--main content-->
    <div class="uk-margin-top">
      <div class="card-scene">
        <Container orientation="horizontal"
            @drop="onColumnDrop($event)"
            drag-handle-selector=".column-drag-handle"
            @drag-start="dragStart"
            :drop-placeholder="upperDropPlaceholderOptions">
                <Draggable v-for="column in sections" :key="column.id">
                    <div class="uk-card section card-container">
                        <div class="card-column-header">
                            <span class="column-drag-handle">&#x2630;</span>
                            {{ column.title }}
                        </div>
                        <Container group-name="col"
                            @drop="(e) => onCardDrop(column.id, e)"
                            @drag-start="(e) => log('drag start', e)"
                            @drag-end="(e) => log('drag end', e)"
                            :get-child-payload="getCardPayload(column.id)"
                            drag-class="card-ghost"
                            drop-class="card-ghost-drop"
                            :drop-placeholder="dropPlaceholderOptions">
                            <Draggable v-for="card in column.cards" :key="card.id">
                                <card-item :card="card"/>
                            </Draggable>
                        </Container>
                    </div>
                </Draggable>
        </Container>
      </div>
    </div>
    <div>
      <bouton title="Enregistrer" class="uk-float-right uk-margin-large-top" @onClicked="saveBoard" primary/>
    </div>
  </div>
</template>
<script>
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag } from "@/utils/helpers";
import { fakeSections } from "@/utils/faker"

import Bouton from "@/components/utils/Bouton.vue";
import CardItem from "@/components/cards/CardItem.vue";
import UIkit from "uikit";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      boardId: this.$route.query.id,
      baseUrl: "/api/board/" + this.$route.query.id + "/section",
      sections: fakeSections,
      board: null,
      boards: [],

      upperDropPlaceholderOptions: {
        className: "cards-drop-preview",
        animationDuration: "150",
        showOnTop: true,
      },
      dropPlaceholderOptions: {
        className: "drop-preview",
        animationDuration: "150",
        showOnTop: true,
      },
    };
  },

  computed: {
    ...mapGetters("data", ["loading", "get"]),
  },

  async mounted() {
    this.boards = this.get("boards");
    this.board = this.getBoard(this.boardId);
    this.loadData();
  },

  methods: {
    ...mapActions("data", ["makeRequest"]),

    loadData: async function() {
      const payload = {
        requestData: { method: "get", url: this.baseUrl },
        commit: true,
        stateProperty: this.stateProperty,
      };

      let response = await this.makeRequest(payload);

      if (!response) {
        this.toast(
          "error",
          this.title,
          this.get("loadingError")
            ? this.get("loadingError")
            : "Oops ! Une erreur est survenue"
        );
      } else {
        this.boards = response.data;
      }
    },

    saveBoard: function() {
      console.log("Saving board sections");
    },

    remove: async function(id) {
      var board = this.getBoard(id);
      var self = this;
      UIkit.modal
        .confirm(
          "<h3>" +
            board.title +
            "</h3> Ce tableau est susceptible de contenir des informations importantes qui seront supprimées. Êtes-vous sûr de vouloir le supprimer ?",
          { labels: { cancel: "Annuler", ok: "Oui, supprimer" } }
        )
        .then(
          async function() {
            const payload = {
              requestData: {
                method: "delete",
                url: self.baseUrl + "/" + board.id,
                data: null,
              },
              commit: false,
            };
            let response = await self.makeRequest(payload);
            if (!response) {
              self.toast(
                "error",
                self.title,
                self.get("loadingError")
                  ? self.get("loadingError")
                  : "Oops ! Une erreur est survenue"
              );
            } else {
              self.loadData();
              self.toast(
                "success",
                self.title,
                "Opération effectuée avec succès !"
              );
            }
          },
          function() {}
        );
    },

    getBoard: function(id) {
      return this.boards.find(function(board) {
        return board.id == id;
      });
    },

    toast: function(type, title, message) {
      this.$notify({ group: "data", title: title, type: type, text: message });
    },

    // Draggable
    onColumnDrop(dropResult) {
      let scene = [...this.sections]
      scene = applyDrag(scene, dropResult);
      this.sections = scene;
    },
    onCardDrop(columnId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const scene = [...this.sections];
        const column = scene.filter((p) => p.id === columnId)[0];
        const columnIndex = scene.indexOf(column);
        const newColumn = Object.assign({}, column);
        newColumn.cards = applyDrag(newColumn.cards, dropResult);
        scene.splice(columnIndex, 1, newColumn);
        this.sections = scene;
      }
    },
    getCardPayload(columnId) {
      return (index) => {
        return this.sections.filter((p) => p.id === columnId)[0].cards[index];
      };
    },
    dragStart() {
      console.log("drag started");
    },
    log(...params) {
      console.log(...params);
    },
  },

  components: {
    Bouton,
    CardItem,
    Container,
    Draggable,
  },
};
</script>
<style scoped>
    .section {
        border: 1px dashed darkgrey;
        background-color: #ffffff;
        border-radius: 3px;
        padding: 20px;
        margin-right: 15px;
        width: 350px;
    }

    .card-column-header {
        margin-bottom: 20px !important;
    }

    .column-drag-handle {
        margin-right: 5px;
    }

    .smooth-dnd-container.vertical > .smooth-dnd-draggable-wrapper {
        overflow: visible !important;
    }

    .column-drag-handle {
        cursor: move !important;
    }

    .drop-preview {
        background-color: rgba(150, 150, 200, 0.1);
        border: 1px dashed #abc;
        margin: 5px;
    }

    .cards-drop-preview {
        background-color: rgba(150, 150, 200, 0.1);
        border: 1px dashed #abc;
        margin: 5px 45px 5px 5px;
    }

    .card-ghost {
        transition: transform 0.18s ease;
        transform: rotateZ(5deg)
    }

    .card-ghost-drop {
        transition: transform 0.18s ease-in-out;
        transform: rotateZ(0deg)
    }

    .opacity-ghost {
        transition: all .18s ease;
        opacity: 0.8;
        /* transform: rotateZ(5deg); */
        background-color: cornflowerblue;
        box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.3);
    }

    .opacity-ghost-drop {
        opacity: 1;
        /* transform: rotateZ(0deg); */
        background-color: white;
        box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.0);
    }
</style>
