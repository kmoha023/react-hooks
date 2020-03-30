import React, {useReducer, useCallback, useEffect} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';
import IngredientList from "./IngredientList";

import useHttp from '../../hooks/useHttp';

import ingredientsReducer from '../../reducer/ingredientsReducer';
import * as actions from '../../actions/index'


function Ingredients() {
    const [userIngredients, dispatchIng] = useReducer(ingredientsReducer, []);
    const {httpState, sendRequest} = useHttp();
    const {isLoading, error, responseData, extraData, reqIdentifier } = {...httpState}

    const addUserIngredient = useCallback(userIngredient => {
        sendRequest(
            `https://react-hooks-cb963.firebaseio.com/ingredients.json`,
            'POST',
            userIngredient,
            userIngredient,
            'ADD_INGREDIENT'
        )
    }, [sendRequest])

    /**
     * useEffect [] second params -- componentDidMount - only at first render - no cleanUp at first, only cleans on unmount
     * useEffect [d1] second params -- componentDidUpdate - on every re-render - cleanUp on update, not first
     */
    useEffect(() => {
        console.log('EFT ', !extraData);
        if(!isLoading && extraData && reqIdentifier === "REMOVE_INGREDIENT"){
            dispatchIng(actions.deleteIngredient(extraData))
        } else if(!isLoading && extraData && extraData.title && responseData && reqIdentifier === "ADD_INGREDIENT") {
            dispatchIng(actions.addIngredient(responseData, extraData))
        }
    }, [responseData, extraData, isLoading, reqIdentifier])

    const removeIngredient = useCallback((ingId) => {
        // setIsLoading(true);
        // fetch(`https://react-hooks-cb963.firebaseio.com/ingredients/${ingId}.json`, {
        //     method: "DELETE",
        // }).then(res => {
        //     console.log(ingId);
        //     setIsLoading(false);
        //     dispatchIng(actions.deleteIngredient(ingId));
        // }).catch(err => {
        //     setIsLoading(false);
        //     setError("Error removing ingredient with id ", ingId)
        // })
        sendRequest(
            `https://react-hooks-cb963.firebaseio.com/ingredients/${ingId}.json`,
            "DELETE",
            null,
            ingId,
            'REMOVE_INGREDIENT'
            )
    },[sendRequest] )

    const filteredIng = useCallback(ingList => {
            dispatchIng(actions.setIngredient(ingList))
    }, [])

    const onCloseModal = useCallback(() => {
        // dispatchHttp(actions.setError(null));
    },[])

    const setIsLoading = useCallback((loadingStatus) => {
        // dispatchHttp(actions.setLoading(loadingStatus));
    }, [])

    const setError = useCallback((err, options) => {
        if(options){
            // dispatchHttp(actions.setError(err, options));
        } else {
            // dispatchHttp(actions.setError(err));
        }
    }, [])

    // const ingredientsList = useMemo(() => {
    //     return <IngredientList ingredients={userIngredients} onRemoveItem={(id) => removeIngredient(id)}/>
    // }, [userIngredients, removeIngredient])

    return (
        <div className="App">
            {error && <ErrorModal onClose={onCloseModal}>{error}</ErrorModal>  }
            <IngredientForm setError={setError} isLoading={isLoading} addUserIngredient={addUserIngredient}/>

            <section>
                <Search setIsLoading={setIsLoading} setError={setError} setUserIngredients={filteredIng}/>
                {/*{ingredientsList}*/}
                <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredient}/>
            </section>
        </div>
    );
}

export default Ingredients;
