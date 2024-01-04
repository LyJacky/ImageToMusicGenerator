from transformers import AutoProcessor, MusicgenForConditionalGeneration
import scipy
import numpy as np


def to_music(text):
    processor = AutoProcessor.from_pretrained("facebook/musicgen-large")
    model = MusicgenForConditionalGeneration.from_pretrained("facebook/musicgen-large")

    inputs = processor(
        text=[text],
        padding=True,
        return_tensors="pt",
    )
    audio_values = model.generate(**inputs, do_sample=True, guidance_scale=3, max_new_tokens=256)
    scipy.io.wavfile.write("../musicgen_out.wav", rate=32000, data=np.array(audio_values[0]))