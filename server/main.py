from flask import Flask, jsonify, request
from flask_cors import CORS
from models.CaptionsToMusic import to_musical
from models.MusicGen import to_music
from models.ImageCaptioner import make_captions
from PIL import Image
app = Flask(__name__)
CORS(app)

@app.route('/api/data', methods=['POST'])
def get_data():
    # Your logic to fetch data from the database or other sources
    if request.files:
        print('I WENT INSIDE OF HERE')
        file = request.files['image']
        img = Image.open(file.stream)
        img.show()
        generate_musical_description_from_caption("test3","modern pop parisian music")
        return jsonify({"res":"i went inside the if statment", 'size': [img.width,img.height]}), 200
    data = {"message": "Hello from Flask!"}
    return jsonify(data),200

def generate_music_from_img():
    print(123)

def generate_musical_description_from_caption(title,text):
    to_music(title,text)

def generate_captions_from_image():
    print(123)
if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=8080)