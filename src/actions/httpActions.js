const LOADING = "LOADING";
const SUCCESS = "SUCCESS";
const ERROR = "ERROR";
const EXTRA = "EXTRA";
const CLEAR = "CLEAR";

export const setLoading = (resp, reqId) => {
    return { type: LOADING, resp: resp , reqId: reqId}
}

export const setSuccess = (resp) => {
    return { type: SUCCESS, responseData: resp }
}

export const setError = (err) => {
    return { type: ERROR, resp: err }
}

export const setExtraData = (resp) => {
    return { type: EXTRA, extraData: resp }
}

export const clear = () => {
    return { type: CLEAR }
}