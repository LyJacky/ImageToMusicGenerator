from flask import Flask, jsonify
from models.CaptionsToMusic import to_musical
from models.MusicGen import to_music
from models.ImageCaptioner import make_captions
app = Flask(__name__)

@app.route('/api/data')
def get_data():
    # Your logic to fetch data from the database or other sources
    data = {"message": "Hello from Flask!"}
    return jsonify(data)

def generate_music_from_img():
    print(123)

def generate_musical_description_from_caption():
    print(133)

def generate_captions_from_image():
    print(123)
if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=8080)