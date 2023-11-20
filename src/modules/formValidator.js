import format from "date-fns/format";
import addDays from "date-fns/addDays";

const resetValidationErrors = () => {
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
    const checkboxes = form.querySelectorAll(".form-checkbox");
    checkboxes.forEach((i) => i.checked = false);
    const selects = form.querySelectorAll(".form-select");
    selects.forEach((i) => i.selectedIndex = 0);
}

const validateCategoryInput = (name, symbol) => {
    resetValidationErrors();
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

const validateTodoInput = (title, description, dueDate, priority, checked) => {
    resetValidationErrors();

    let validated = null;
    
    if (title.value.length < 1) {
        validated = false;
        appendValidationErrors(title, "can't be empty.");
    } else if(title.value.length > 50) {
        validated = false;
        appendValidationErrors(title, "can't be longer than 50 characters.");
    }

    if (description.value.length > 100) {
        validated = false;
        appendValidationErrors(description, "can't be longer than 100 characters");
    } 

    if (validated === false ) return;
    validated = { title: title.value, description: description.value, dueDate: dueDate.value, priority: priority.value, checked: checked.checked }

    // Set date to tomorrow if not specified.
    if (dueDate.value.length < 1) {
        const currentDate = new Date();
        let tomorrow = addDays(currentDate, 1);
        tomorrow = format(tomorrow, "yyyy-MM-dd");
        validated.dueDate = tomorrow;
    }

    if (priority.value == null) {
        validated.priority = "todo-priority-low";
    }

    validated.checked = (validated.checked) ? true : false;

    if(validated) clearInputs(title.parentElement.parentElement);
    return validated;
}

const formValidator = {
    validateCategoryInput,
    validateTodoInput,
    resetValidationErrors
};

export default formValidator;