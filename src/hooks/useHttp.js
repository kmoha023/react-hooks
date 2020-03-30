import {useReducer, useCallback } from "react";
import httpReducer from '../reducer/httpReducer'
import * as actions from "../actions";

const initialHttpState = {isLoading: false, error: null, responseData: null, extraData: null, reqIdentifier: null}

const useHttp = () => {
    const [httpState, dispatchHttp] = useReducer(httpReducer, initialHttpState);

    const clear = () => dispatchHttp(actions.clear());

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
                if(res.status >= 200 && res.status <= 299){
                    dispatchHttp(actions.setSuccess(null))
                    dispatchHttp(actions.setExtraData(null))

                    dispatchHttp(actions.setLoading(false, reqId));
                    return res.json()
                } else {
                    throw Error(res.statusText)
                }

            })
            .then(resData => {
                dispatchHttp(actions.setSuccess(resData))
                dispatchHttp(actions.setExtraData(extraData))
            })
            .catch(err => {
                dispatchHttp(actions.setLoading(false, null));
                dispatchHttp(actions.setError(err.message));
            })
    }, [])

    return {httpState, clear: clear, sendRequest}
};

export default useHttp;
