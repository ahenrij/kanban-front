export const applyDrag = (arr, dragResult) => {
    const { removedIndex, addedIndex, payload } = dragResult
    if (removedIndex === null && addedIndex === null) return arr
  
    const result = [...arr]
    let itemToAdd = payload
  
    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0]
    }
  
    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd)
    }
  
    return result
}

export const timestampToDate = function (timestamp) {

    var date = new Date(timestamp);
    //var hours = date.getHours();
    //var minutes = "0" + date.getMinutes();
    //var seconds = "0" + date.getSeconds();
    //var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return date.toLocaleDateString()
}

export const getInitials = function (name) {
    let names = name.split(" ")
    let initials = ""
    for(let i=0; i < names.length; i++) {
        if (i == 2) {
            break;
        }
        initials += names[i][0].toUpperCase()
    }
    return initials
}