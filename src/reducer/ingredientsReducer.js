const ingredientsReducer = (ingState, action) => {
  switch(action.type){
      case 'PUT':
          return [
              ...action.resp
              ]
      case 'ADD':
          return [
              ...ingState,
              action.resp
          ]
      case 'DELETE':
          return ingState.filter(ing => ing.id !== action.resp)

      default: throw new Error('Error in ingredientsReducer, no case found ');
  }
}

export default ingredientsReducer;