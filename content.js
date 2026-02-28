const mapping = { "Full Name": "Name", "DOB": "Date of Birth", "Land Acre": "Number of Acres" };
const userData = { "Full Name": "Mosaraf", "DOB": "01-01-2000", "Land Acre": "5" };

for (const pdfKey in mapping) {
    const formFieldName = mapping[pdfKey];
    const value = userData[pdfKey];

    const input = document.querySelector(`input[name="${formFieldName}"]`);
    if(input) input.value = value;
}