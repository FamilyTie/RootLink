from flask_cors import CORS
from flask import Flask, request, jsonify
import joblib


app = Flask(__name__)
CORS(app)

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    return jsonify({'message': 'Route is working', 'received_data': data})

if __name__ == '__main__':
    app.run(port=5000, debug=True)



