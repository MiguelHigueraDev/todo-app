const categoryListContainer = document.querySelector('#category-list');

const updateCategoryList = (categories) => {
    categoryListContainer.innerHTML = "";
    for(const c of categories) {
        const cat = document.createElement('li');
        cat.textContent = c.name;
        const icon = document.createElement('i');
        icon.textContent = c.symbol;
        cat.appendChild(icon);
        categoryListContainer.appendChild(cat);
    }
}

export { updateCategoryList }