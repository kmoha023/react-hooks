import {useReducer, useCallback } from "react";
import httpReducer from '../reducer/httpReducer'
import * as actions from "../actions";

const useHttp = () => {
    const [httpState, dispatchHttp] = useReducer(httpReducer, {isLoading: false, error: null, responseData: null, extraData: null, reqIdentifier: null});

    const sendRequest = useCallback((url, method, body, extraData, reqId) => {
            dispatchHttp(actions.setLoading(true, reqId));
        let options = method !== 'GET' ? {
                method: method,
                body: JSON.stringify(body),
                headers: {'Content-Type': 'application/json'}
            } : null
        // dispatchHttp(actions.setExtraData(null))
        fetch(url, options)
            .then(res => {
                // clearing data and success and Extra data from httpState
                dispatchHttp(actions.setSuccess(null))
                dispatchHttp(actions.setExtraData(null))

                dispatchHttp(actions.setLoading(false, reqId));
                return res.json()
            })
            .then(resData => {
                dispatchHttp(actions.setSuccess(resData))
                dispatchHttp(actions.setExtraData(extraData))
            })
            .catch(err => {
                dispatchHttp(actions.setLoading(false, reqId));
                dispatchHttp(actions.setError("Error posting data to database"));
            })
    }, [])

    return {httpState, sendRequest}
};

export default useHttp;
