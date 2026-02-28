// Mapping of PDF keys to form field identifiers
const mapping = {
    "Full Name": "Name",
    "DOB": "Date of Birth",
    "Land Acre": "Number of Acres"
};

// User data to fill
const userData = {
    "Full Name": "Mosaraf",
    "DOB": "01-01-2000",
    "Land Acre": "5"
};

// Function to wait for a field to appear
function waitForField(selectors, callback, intervalTime = 200, maxTries = 50) {
    let tries = 0;
    const interval = setInterval(() => {
        tries++;
        let field = null;
        for (const sel of selectors) {
            field = document.querySelector(sel);
            if (field) break;
        }

        if (field) {
            clearInterval(interval);
            callback(field);
        } else if (tries >= maxTries) {
            clearInterval(interval);
            console.warn("Field not found for selectors:", selectors);
        }
    }, intervalTime);
}

// Function to fill a single field
function fillField(field, value) {
    field.value = value;

    // Trigger events so React/Angular forms detect the change
    field.dispatchEvent(new Event('input', { bubbles: true }));
    field.dispatchEvent(new Event('change', { bubbles: true }));
}

// Auto-fill all fields based on mapping
for (const pdfKey in mapping) {
    const fieldName = mapping[pdfKey];
    const value = userData[pdfKey];

    // Use multiple selectors for better matching
    const selectors = [
        `input[name="${fieldName}"]`,
        `input[id="${fieldName}"]`,
        `input[placeholder*="${fieldName}"]`,
        `textarea[name="${fieldName}"]`,
        `textarea[id="${fieldName}"]`,
        `textarea[placeholder*="${fieldName}"]`
    ];

    waitForField(selectors, (field) => fillField(field, value));
}