from flask_cors import CORS
from flask import Flask, request, jsonify

app = Flask(__name__)
CORS(app)

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    return jsonify({'message': 'Route is working', 'received_data': data})

@app.route('/')
def index():
    app.logger.debug('This is a debug message')
    app.logger.info('This is an info message')
    app.logger.warning('This is a warning message')
    app.logger.error('This is an error message')
    app.logger.critical('This is a critical message')
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(port=5000, debug=True)
