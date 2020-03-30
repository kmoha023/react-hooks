import React from 'react';

import './IngredientList.css';

const IngredientList = React.memo(props => {
    console.log("[RENDERING INGREDIENTSLIST]", props);
    return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>
      <ul>
        {props.ingredients.map(ig => {
            return <li key={ig.id} onClick={props.onRemoveItem.bind(this, ig.id)}>
                    <span>{ig.title}</span>
                    <span>${ig.amount}</span>
                </li>
            }
        )}
      </ul>
    </section>
  );
});

export default IngredientList;
