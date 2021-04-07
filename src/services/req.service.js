/**
 * Service used to make any request on API.
 */
import ApiService from './api.service'

class ReqError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const ReqService = {
    /**
     * Make request to the API.
     * 
     * @returns api response
     * @throws ReqError 
    **/
    async makeRequest(requestData) {
        
        try {
            const response = await ApiService.customRequest(requestData);
            return response;
        } catch (error) {
            throw new ReqError(error.response.status, error.response.data.message)
        }
    }
}

export default ReqService

export { ReqService, ReqError }