from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from model.CaptionsToMusic import to_musical
from model.MusicGen import to_music
from model.ImageCaptioner import make_captions
from PIL import Image
import io
import scipy.io.wavfile as wavfile
import torch
app = Flask(__name__)
CORS(app)

@app.route('/api/data', methods=['POST'])
def get_data():
    # Your logic to fetch data from the database or other sources
    if request.files:
        file = request.files['image']
        img = Image.open(file.stream)
        captions = generate_captions_from_image(img)
        print('CAPTIONS: ', captions)
        musical_descriptions = generate_musical_description_from_caption(captions)
        print('MUSICAL DESCRIPTION: ', musical_descriptions)
        audio_values,sampling_rate = generate_music_from_musical_captions("test6",musical_descriptions)
        wav_buffer = io.BytesIO()
        wavfile.write(wav_buffer, rate=sampling_rate, data=audio_values)
        wav_buffer.seek(0)
        print('I MADE OUT AFTER CREATING THE FILES')
        return send_file(wav_buffer, mimetype="audio/wav", as_attachment=True, download_name=f"test6.wav")
        # return jsonify({"res":"i went inside the if statment", 'size': [img.width,img.height]}), 200
    data = {"message": "Hello from Flask!"}
    return jsonify(data),200

def generate_music_from_musical_captions(musical_descriptions,title):
    return to_music(musical_descriptions,title)

def generate_musical_description_from_caption(caption):
    return to_musical(caption)

def generate_captions_from_image(img):
    return make_captions(img)[0]


if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=8080)