from flask import Flask, jsonify, request
from flask_cors import CORS
from models.CaptionsToMusic import to_musical
from models.MusicGen import to_music
from models.ImageCaptioner import make_captions
from PIL import Image
import torch
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
        print(to_musical("A picture of the eiffel tower at night"))
        print(generate_captions_from_image(img))
        # generate_musical_description_from_caption("test4","modern pop parisian music")
        return jsonify({"res":"i went inside the if statment", 'size': [img.width,img.height]}), 200
    data = {"message": "Hello from Flask!"}
    return jsonify(data),200

def generate_music_from_img(caption):
    return to_musical(caption)

def generate_musical_description_from_caption(title,text):
    return to_music(title, text)

def generate_captions_from_image(img):
    return make_captions(img)


if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=8080)