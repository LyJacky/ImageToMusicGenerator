from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from model.CaptionsToMusic import to_musical
from model.MusicGen import to_music
from model.ImageCaptioner import make_captions
from model.ThreeToOneSentence import combine_to_one
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
        multiple = False
        # file = request.files['image']
        # img = Image.open(file.stream)
        if 'image1' in request.files:
            # rename to file
            img1 = request.files['image1']
            image1 = Image.open(img1.stream)
            image1.show()
            print(image1)
            # Process image1

        # Check if 'image2' is present in the request
        if 'image2' in request.files:
            multiple = True
            img2 = request.files['image2']
            img3 = request.files['image3']
            image2 = Image.open(img2.stream)
            image3 = Image.open(img3.stream)
            image2.show()
            image3.show()

            # Process image2

        if multiple:
            print('THE IMAGE 1 IS SUPPOSED TO BE')
            print(image1)
            captions1 = generate_captions_from_image(image1)
            captions2 = generate_captions_from_image(image2)
            captions3 = generate_captions_from_image(image3)
            concat = captions1 + captions2 + captions3
            captions = combine_to_one(concat)
        else:
            captions = generate_captions_from_image(image1)
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