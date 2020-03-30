import React, { useState, useEffect, useRef, useReducer } from 'react';

import Card from '../UI/Card';
import './Search.css';
import useHttp from "../../hooks/useHttp";
import ingredientsReducer from "../../reducer/ingredientsReducer";

const Search = React.memo(props => {
    const {httpState, sendRequest} = useHttp();
    const [userIngredients, dispatchIng] = useReducer(ingredientsReducer, []);
    const [filterTitle, setFilterTitle] = useState('')
    const inputRef = useRef();
    const {isLoading, error, responseData, extraData, reqIdentifier } = {...httpState}
    const { setUserIngredients } = props;

    /**
     * useEffect [] second params -- componentDidMount - only at first render - no cleanUp at first, only cleans on unmount
     * useEffect [d1] second params -- componentDidUpdate - on every re-render - cleanUp on update, not first
     */

    const mapObjectToArray = (responseData) => {
        const ingredient = [];
        for (let key in responseData) {
            ingredient.push({
                id: key,
                title: responseData[key].title,
                amount: responseData[key].amount,
            })
        }
        return ingredient;
    }

    useEffect(() => {
        if(!isLoading && responseData) {
            if (reqIdentifier === 'SET_INGREDIENT') {
                setUserIngredients(mapObjectToArray(responseData));
            } else if(reqIdentifier === "FILTER_INGREDIENT") {
                let ingList = mapObjectToArray(responseData);
                // let filteredExistingIng = ingList.map(filteredIng => {
                //     return userIngredients.filter(existingIng => existingIng.id !== filteredIng.id)
                // })
                setUserIngredients(ingList);
            }
        }
    }, [responseData, reqIdentifier, isLoading])

    useEffect( () => {
        console.log('[EFFECT...]');
        const timer = setTimeout(() => {
            /**
             * filterTitle will be set when setTimeout is declared.
             * inputRef.current.value is current value user enters
             */
            if(filterTitle === inputRef.current.value) {
                const query = filterTitle.length === 0 ? '' : `?orderBy="title"&equalTo="${filterTitle}"`;
                const reqId = filterTitle.length === 0 ? "SET_INGREDIENT" : "FILTER_INGREDIENT"
                sendRequest(
                    `https://react-hooks-cb963.firebaseio.com/ingredients.json${query}`,
                    'GET',
                    null,
                    null,
                    reqId
                )
                // fetch("https://react-hooks-cb963.firebaseio.com/ingredients.json" + query)
                //     .then(res => {
                //         return res.json()
                //     })
                //     .then(resData => {
                //         console.log(resData);
                //         const ingredient = [];
                //         for (let key in resData) {
                //             console.log(typeof resData[key]);
                //
                //             ingredient.push({
                //                 id: key,
                //                 title: resData[key].title,
                //                 amount: resData[key].amount,
                //             })
                //         }
                //         props.setIsLoading(false);
                //         setUserIngredients(ingredient);
                //     }).catch(err => {
                //         props.setIsLoading(false);
                //         props.setError("Error fetching Ingredients list");
                //     })
            }
        }, 500)

        /**
         *
         * CleanUp - no dependency [] -- runs on unmount
         *         - dependency [d1,d2] -- runs before running second time, third time .... like CompUpdate
         */
        return () => {
            console.log('[CLEANING...]');
            clearTimeout(timer)
        }

    }, [filterTitle, setUserIngredients, sendRequest])


  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={filterTitle} ref={inputRef}  onChange={event => setFilterTitle(event.target.value)}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
