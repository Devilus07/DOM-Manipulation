
// When the user clicks "Filter Articles"
function showFilter() {
  const filterForm = document.getElementById("filterContent");
  const newForm = document.getElementById("newContent");

  // hide the other menu
  newForm.style.display = "none";

  // If the filter form is visible, hide it. If not show it. 
  filterForm.style.display = (filterForm.style.display === "block") ? "none" : "block";
}

// When the user clicks "Add new article"
function showAddNew() {
  const filterForm = document.getElementById("filterContent");
  const newForm = document.getElementById("newContent");

  // hide the other menu
  filterForm.style.display = "none";

  // Toggle the add new form, using flex becuase the CSS layout also uses it 
  newForm.style.display = (newForm.style.display === "flex") ? "none" : "flex";
}

// Run whenever a checkbox is checked/unchecked
function filterArticles() {
    // Makes sure which box is selected 
  const showOpinion = document.getElementById("opinionCheckbox").checked;
  const showRecipe  = document.getElementById("recipeCheckbox").checked;
  const showUpdate  = document.getElementById("updateCheckbox").checked;

  // This will loop through every article on the page 
  document.querySelectorAll("#articleList article").forEach(article => {
    if (article.classList.contains("opinion")) {
      article.style.display = showOpinion ? "" : "none";
    } else if (article.classList.contains("recipe")) {
      article.style.display = showRecipe ? "" : "none";
    } else if (article.classList.contains("update")) {
      article.style.display = showUpdate ? "" : "none";
    }
  });
}

// Add the user's new article into the list with proper styling
function addNewArticle() {
    // Gets the title 
  const title = document.getElementById("inputHeader").value.trim();
  // Gets the article text from the text box 
  const text  = document.getElementById("inputArticle").value.trim();
    // References to each button 
  const opinionRadio = document.getElementById("opinionRadio");
  const recipeRadio  = document.getElementById("recipeRadio");
  const lifeRadio    = document.getElementById("lifeRadio");

  // This will help store what type the user has selected 
  let typeClass = "";
  let markerText = "";

  // This will loop through and determine which radio button was selected 
  if (opinionRadio.checked) {
    typeClass = "opinion";
    markerText = "Opinion";
  } else if (recipeRadio.checked) {
    typeClass = "recipe";
    markerText = "Recipe";
  } else if (lifeRadio.checked) {
    typeClass = "update";  
    markerText = "Update";
  }

  // Basic validation to avoid any empty submissions 
  if (!title || !text || !typeClass) {
    alert("Please enter a title, choose a type, and enter text.");
    return;
  }

  // creates a new article
  const article = document.createElement("article");
  article.classList.add(typeClass);
  article.id = "user_" + Date.now(); // Giving it a unique id

  // Creates the colored marker
  const marker = document.createElement("span");
  marker.className = "marker";
  marker.textContent = markerText;

  // Article title
  const h2 = document.createElement("h2");
  h2.textContent = title;

  // Article text
  const p = document.createElement("p");
  p.textContent = text;

  // read more link
  const pLink = document.createElement("p");
  const link = document.createElement("a");
  link.href = "moreDetails.html";
  link.textContent = "Read more...";
  pLink.appendChild(link); // adding the link inside the paragraph 

  // This will put everything inside the article 
  article.appendChild(marker);
  article.appendChild(h2);
  article.appendChild(p);
  article.appendChild(pLink);

  document.getElementById("articleList").appendChild(article);

  // apply current filters immediately
  filterArticles();

  // clear inputs
  document.getElementById("inputHeader").value = "";
  document.getElementById("inputArticle").value = "";
  opinionRadio.checked = false;
  recipeRadio.checked = false;
  lifeRadio.checked = false;

  // hide the form after adding
  document.getElementById("newContent").style.display = "none";
}
