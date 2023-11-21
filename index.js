const dobInput = document.getElementById("dob"); // Updated ID to match HTML
dobInput.addEventListener("input", () => validate(dobInput.value));

function validate(dobValue) {
    const today = new Date();
    const dobDate = new Date(dobValue);

    const age = today.getFullYear() - dobDate.getFullYear();

    if (age < 18 || age > 55) {
        dobInput.setCustomValidity("You must be between 18 and 55 years old to register.");
        dobInput.reportValidity();
    } else {
        dobInput.setCustomValidity('');
    }
}

const userForm = document.getElementById('my-form');

const retrieveEntries = () => {
    let entries = localStorage.getItem('userEntries');
    if (entries) {
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;
};

const saveEntry = (entry) => {
    let entries = retrieveEntries();
    entries.push(entry);
    localStorage.setItem('userEntries', JSON.stringify(entries));
};

const displayEntries = () => {
    const entries = retrieveEntries();

    const tableEntries = entries.map((entry) => {
        const nameCell = `<td>${entry.fullName || ''}</td>`;
        const emailCell = `<td>${entry.Email || ''}</td>`;
        const passwordCell = `<td>${entry.Password || ''}</td>`;
        const dobCell = `<td>${entry.Dob || ''}</td>`;
        const t_cCell = `<td>${entry.acceptTerms || ''}</td>`;
        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${t_cCell}</tr>`;
        return row;
    }).join("\n");

    const details = document.getElementById('user-entries');
    details.innerHTML = tableEntries;
};

const saveUserForm = (event) => {
    event.preventDefault();
    const entry = {
        fullName: document.querySelector('#name').value, // Updated ID to match HTML
        Email: document.querySelector('#email').value, // Updated ID to match HTML
        Password: document.querySelector('#password').value, // Updated ID to match HTML
        Dob: document.querySelector('#dob').value,
        acceptTerms: document.querySelector('#termsConditions').checked ? 'true' : 'false'
    };

    if (!validateInput(entry)) {
        alert("Please fill all fields with valid data!");
        return false;
    } else {
        saveEntry(entry);
        clearFields();
        displayEntries();
    }
};

const validateInput = (entry) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return entry.fullName && emailRegex.test(entry.Email) && entry.Password && entry.Dob;
};

const clearFields = () => {
    document.querySelector('#name').value = ''; // Updated ID to match HTML
    document.querySelector('#email').value = ''; // Updated ID to match HTML
    document.querySelector('#password').value = ''; // Updated ID to match HTML
    document.querySelector('#dob').value = '';
    document.querySelector('#termsConditions').checked = false;
};

userForm.addEventListener('submit', saveUserForm);

function updateEntries() {
    displayEntries();
}

// Display entries on page load
displayEntries();
