# Importing Flask
from flask import Flask, request, jsonify

# Importing the functions from the classifier.py
from classifier import get_prediction

# Creating the Flask app
app = Flask(__name__)

# Creating the route for the API
@app.route('/predict-alphabet', methods=['POST'])
def predict_digit():
    # Getting the image from the request
    image = request.files.get('alphabet')
    # Getting the prediction from the classifier
    prediction = get_prediction(image)
    # Returning the prediction
    return jsonify({'prediction': prediction}), 200

# Running the app
if __name__ == '__main__':
    app.run(debug=True)