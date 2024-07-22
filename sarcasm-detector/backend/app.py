from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# Load the pre-trained model and vectorizer
model = joblib.load('model.pkl')
vectorizer = joblib.load('vectorizer.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    # Extract the 'headline' from the JSON data
    data = request.json.get('headline')
    if data is None:
        return jsonify({'error': 'No headline provided'}), 400

    # Transform the input data using the vectorizer
    transformed_data = vectorizer.transform([data])
    
    # Predict using the loaded model
    prediction = model.predict(transformed_data)
    
    # Return the prediction result as JSON
    return jsonify({'sarcastic': bool(prediction[0])})

if __name__ == '__main__':
    app.run(debug=True)