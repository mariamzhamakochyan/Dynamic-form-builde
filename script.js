document.addEventListener("DOMContentLoaded", function() {
  const addFieldBtn = document.getElementById("add-field-btn");
  const addOptionBtn = document.getElementById("add-option-btn");
  let formFields = [];

  addFieldBtn.addEventListener("click", addField);
  addOptionBtn.addEventListener("click", addOption);

  function addField() {
    const fieldType = document.getElementById("field-type").value;
    const label = prompt(`Enter label for the ${fieldType}:`);
    const field = { type: fieldType, label };

    switch (fieldType) {
      case "text":
      case "email":
        field.input = document.createElement("input");
        field.input.type = fieldType;
        field.input.placeholder = label;
        break;
      case "dropdown":
        const options = prompt("Enter options separated by comma (,):").split(",");
        field.select = document.createElement("select");
        options.forEach(option => {
          const optionElem = document.createElement("option");
          optionElem.text = option.trim();
          field.select.add(optionElem);
        });
        field.options = options.map(option => option.trim());
        break;
    }

    formFields.push(field);
    renderForm();
  }

  function addOption() {
    if (formFields.length === 0 || formFields[formFields.length - 1].type !== "dropdown") {
      alert("Please add a dropdown field first.");
      return;
    }

    const dropdown = formFields[formFields.length - 1].select;
    const optionText = prompt("Enter option text:");
    const optionElem = document.createElement("option");
    optionElem.text = optionText.trim();
    dropdown.add(optionElem);
    formFields[formFields.length - 1].options.push(optionText.trim());
  }

  function renderForm() {
    const formArea = document.getElementById("form-area");
    formArea.innerHTML = "";
    formFields.forEach((field, index) => {
      const fieldDiv = document.createElement("div");
      fieldDiv.classList.add("field");
      fieldDiv.appendChild(document.createTextNode(field.label + ": "));
      
      switch (field.type) {
        case "input":
        case "dropdown":
          fieldDiv.appendChild(field.input || field.select);
          break;
      }

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.classList.add("button", "remove-button");
      removeBtn.addEventListener("click", () => {
        formFields.splice(index, 1);
        renderForm();
      });
      fieldDiv.appendChild(removeBtn);
      formArea.appendChild(fieldDiv);
    });
  }
});
