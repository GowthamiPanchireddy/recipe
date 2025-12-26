const container = document.getElementById("recipeContainer");
const search = document.getElementById("search");

const modal = document.getElementById("recipeModal");
const closeBtn = document.querySelector(".close");

async function getRecipes(query = "") {
    const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const data = await res.json();
    displayRecipes(data.meals);
}

function displayRecipes(meals) {
    container.innerHTML = "";

    if (!meals) {
        container.innerHTML = "<h2>No recipes found 😢</h2>";
        return;
    }

    meals.forEach(meal => {
        const card = document.createElement("div");
        card.className = "recipe-card";
        card.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
        `;
        card.onclick = () => showRecipe(meal);
        container.appendChild(card);
    });
}

function showRecipe(meal) {
    document.getElementById("modalTitle").innerText = meal.strMeal;
    document.getElementById("modalImg").src = meal.strMealThumb;
    document.getElementById("instructions").innerText = meal.strInstructions;

    const ingredientsList = document.getElementById("ingredients");
    ingredientsList.innerHTML = "";

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient && ingredient.trim() !== "") {
            const li = document.createElement("li");
            li.innerText = ingredient;
            ingredientsList.appendChild(li);
        }
    }

    if (meal.strYoutube) {
        const videoId = meal.strYoutube.split("v=")[1];
        document.getElementById("video").src =
            `https://www.youtube.com/embed/${videoId}`;
    }

    modal.style.display = "block";
}

closeBtn.onclick = () => {
    modal.style.display = "none";
    document.getElementById("video").src = "";
};

search.addEventListener("input", () => {
    getRecipes(search.value);
});


getRecipes();


