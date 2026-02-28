import joblib  # to load .pkl files
from flask import Flask, request, jsonify  # to make a simple local server

# 1️⃣ Load the models
rf_model = joblib.load("models/rf_smart_form_filler.pkl")
le = joblib.load("models/label_encoder.pkl")

# 2️⃣ Create a tiny web server
app = Flask(__name__)

# 3️⃣ Define an endpoint that predicts field mapping
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json  # Example: { "pdf_keys": ["Full Name","DOB"], "form_fields": ["Name","Date of Birth"] }
    
    # Here you would:
    # - Convert keys + form labels to features (embeddings + numeric features)
    # - Use Random Forest to predict which PDF key goes to which field
    # For now, just a dummy example:
    mapping = ["Name", "Date of Birth"]  # predicted mapping
    
    return jsonify({"mapping": mapping})

# 4️⃣ Run server
app.run(port=5000)  # opens local server at http://127.0.0.1:5000