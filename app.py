from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/generate', methods=['POST'])
def login_user():
    code = request.json.get('code')
    return jsonify({"explanation": code})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=2000, debug=True)