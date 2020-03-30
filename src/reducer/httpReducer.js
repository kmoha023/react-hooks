const httpReducer = (httpState, action) => {
    console.warn("type : ",action.type,"\n state :", httpState ,"\n action: ", action)
    switch(action.type){
        case 'LOADING':
            return {
                ...httpState,
                isLoading: action.resp,
                reqIdentifier: action.reqId
            }
        case 'SUCCESS':
            return {
                ...httpState,
                responseData: action.responseData
            }
        case 'ERROR':
            return {
                ...httpState,
                error: action.resp
            }
        case 'EXTRA':
            return {
                ...httpState,
                extraData: action.extraData
            }
        case 'CLEAR':
            return {
                ...httpState,
                error: null
            }
        default: throw new Error('Error in httpReducer, no case found ');
    }
}

export default httpReducer;