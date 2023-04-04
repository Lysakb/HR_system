const buildResponse = (response) =>{
    return {
        ...response,
        status: "success",
        statusCode: 200
    }
}

const buildFailedResponse = (response) =>{
    return{
        ...response,
        status: "failure",
        statusCode: 400
    }
}

module.exports = {
    buildResponse,
    buildFailedResponse
}