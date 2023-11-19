const resetCategoryValidationErrors = () => {
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach((i) => i.classList.remove('input-error'));
    const labels = document.querySelectorAll('.input-error-label');
    labels.forEach((l) => l.textContent = "");
}

const addInputErrorClass = (element) => {
    element.classList.add('input-error');
}

const appendValidationErrorLabel = (element, message) => {
    const label = element.parentElement.querySelector('.input-label').textContent;
    const small = element.parentElement.querySelector('.input-error-label');
    small.textContent = `${label} ${message}`;
}

const appendValidationErrors = (element, message) => {
    addInputErrorClass(element);
    appendValidationErrorLabel(element, message);
}

const clearInputs = (form) => {
    const inputs = form.querySelectorAll('.form-input');
    inputs.forEach((i) => i.value = "");
}

const validateCategoryInput = (name, symbol) => {
    resetCategoryValidationErrors();
    let validated = {name: name.value, symbol: symbol.value};

    if (name.value.length < 1) {
        validated = false;
        appendValidationErrors(name, "can't be empty.");
    } else if (name.value.length > 20) {
        validated = false;
        appendValidationErrors(name, "can't be longer than 20 characters.");
    }

    if (symbol.value.length < 1) {
        validated = false;
        appendValidationErrors(symbol, "can't be empty.");
    } else if (symbol.value.length > 2) {
        validated = false;
        appendValidationErrors(name, "can't be longer than 2 characters.");
    }
    
    if(validated) clearInputs(name.parentElement.parentElement);
    return validated;
}

export { validateCategoryInput, resetCategoryValidationErrors }