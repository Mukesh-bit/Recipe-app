const searchBox = document.querySelector('.search-box')
const searchBtn = document.querySelector('.btn')
const recipeContainer = document.querySelector('.recipe-container')
const recipeDetailsContent = document.querySelector('.recipe-details-content')
const recipeCloseBtn = document.querySelector('.recipe-close-btn')


// Function To FetchRecipe
const fetchRecipe =async (searchInput) => {
    recipeContainer.innerHTML = "<h1>Please Wait...</h1>";
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
        const response = await data.json();

        recipeContainer.innerHTML = "";

        response.meals.forEach(meal =>{
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p><span>${meal.strCategory}</span></p>
            `
            const button = document.createElement('button');
            button.innerHTML = "View Recipe";
            recipeDiv.appendChild(button);

            // Adding EventListener to recipe Button
            button.addEventListener('click', () => {
                openRecipePopup(meal);
            })

            recipeContainer.appendChild(recipeDiv);
        }) 
    } catch (error) {
        recipeContainer.innerHTML = "<h1>Please Type Correct Recipe...</h1>";    
    }

}

// Function to fetch ingredients and measurement
const fetchIngredents = (meal) => {
    let ingredentsList = "";
    for(let i=1; i<=20; i++) {
        const ingredent = meal[`strIngredient${i}`];
        if(ingredent) {
            const measure = meal[`strMeasure${i}`];
            ingredentsList += `<li>${measure} ${ingredent}</li>`
        }
        else {
            break;
        }
    }
    return ingredentsList;
}

// Function to open popup recipe
const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredents:</h3>
        <ul class="ingredentList">${fetchIngredents(meal)}</ul>
        <div class="instruction">
            <h3>Instruction:</h3>
            <p>${meal.strInstructions}</p>
        </div>
    `

    
    recipeDetailsContent.parentElement.style.display = "block";
}

// Function to close recipe menu
recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none";
})

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput) {
        recipeContainer.innerHTML = `<h2>Type the meal in the search box.</h2>`;
        return
    }
    fetchRecipe(searchInput);
})