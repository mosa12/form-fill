// -------- Load Random Forest Model --------
async function loadModel() {
    const response = await fetch(chrome.runtime.getURL("rf_model.json"));
    return await response.json();
}

// -------- Load Label Mapping --------
async function loadLabelMapping() {
    const response = await fetch(chrome.runtime.getURL("label_mapping.json"));
    return await response.json();
}

// -------- Predict Single Tree --------
function predictTree(tree, features) {
    let node = 0;

    while (tree.children_left[node] !== -1) {
        const featureIndex = tree.feature[node];
        const threshold = tree.threshold[node];

        if (features[featureIndex] <= threshold) {
            node = tree.children_left[node];
        } else {
            node = tree.children_right[node];
        }
    }

    return tree.value[node]; // class vote array
}

// -------- Predict Random Forest --------
function predictRF(model, features) {
    const votes = new Array(model.n_classes).fill(0);

    for (const tree of model.trees) {
        const result = predictTree(tree, features);

        // Find class with highest probability in this tree
        const predictedClass = result.indexOf(Math.max(...result));

        votes[predictedClass]++;
    }

    // Final class = majority vote
    return votes.indexOf(Math.max(...votes));
}

// -------- Button Click --------
document.getElementById("autoFillBtn").addEventListener("click", async () => {

    // 1️⃣ Load model
    const model = await loadModel();

    // 2️⃣ Load label mapping
    const labelData = await loadLabelMapping();

    // 3️⃣ Prepare feature vector (replace with real features later)
    const features = [
        0.12,
        0.44,
        0.33,
        0.5,
        0
    ];

    // 4️⃣ Get predicted index
    const predictedIndex = predictRF(model, features);

    // 5️⃣ Convert index → real label
    const predictedField = labelData.classes[predictedIndex];

    console.log("Predicted Index:", predictedIndex);
    console.log("Predicted Label:", predictedField);

    alert("Predicted Field: " + predictedField);
});