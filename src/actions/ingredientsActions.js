const PUT = "PUT";
const ADD = "ADD";
const DELETE = "DELETE";

export const addIngredient = (res, userIngredient) => {
    console.log(res, userIngredient);
    return { type: ADD, resp: {id: res.name, ...userIngredient} }
}

export const setIngredient = (ingList) => {
    return { type: PUT, resp: ingList }
}

export const deleteIngredient = (ingId) => {
    return { type: DELETE, resp: ingId }
}