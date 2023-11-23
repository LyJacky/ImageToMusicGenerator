from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/data')
def get_data():
    # Your logic to fetch data from the database or other sources
    data = {"message": "Hello from Flask!"}
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)