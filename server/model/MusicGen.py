from transformers import AutoProcessor,MusicgenForConditionalGeneration
from transformers import pipeline
import scipy
import numpy as np


def to_music(title,text):
    processor = AutoProcessor.from_pretrained("facebook/musicgen-large")
    model = MusicgenForConditionalGeneration.from_pretrained("facebook/musicgen-large")

    inputs = processor(
        text=[text],
        padding=True,
        return_tensors="pt",
    )
    audio_values = model.generate(**inputs, do_sample=True, guidance_scale=3, max_new_tokens=256)
    sampling_rate = model.config.audio_encoder.sampling_rate
    scipy.io.wavfile.write("../musicgen_out"+title+".wav", rate=sampling_rate, data=audio_values[0, 0].numpy())
    data = audio_values[0, 0].numpy()
    return data,sampling_rate

if __name__ == "__main__":
    to_music("test2","modern pop horror music")