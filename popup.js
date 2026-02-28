document.getElementById("autoFillBtn").addEventListener("click", async () => {
    const pdfFile = document.getElementById("pdfUpload").files[0];
    
    // Read PDF keys here (using pdf-lib in JS or send to Python)
    
    // Load the ONNX model from your extension folder
const session = await ort.InferenceSession.create(chrome.runtime.getURL("models/rf_model.onnx"));
    const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            pdf_keys: ["Full Name","DOB","Land Acre"], // example
            form_fields: ["Name","Date of Birth","Number of Acres"]
        })
    });
    
    const data = await response.json();
    console.log(data.mapping); // predicted field mapping
});