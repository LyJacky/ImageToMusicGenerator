import torch
import argparse
from configuration import Config
import torchvision as tv
from PIL import Image
import numpy as np
from transformers import BertTokenizer


MAX_DIM = 299


def under_max(image):
    if image.mode != 'RGB':
        image = image.convert("RGB")

    shape = np.array(image.size, dtype=np.cfloat)
    long_dim = max(shape)
    scale = MAX_DIM / long_dim

    new_shape = (shape * scale).astype(int)
    image = image.resize(new_shape)

    return image



val_transform = tv.transforms.Compose([
    tv.transforms.Lambda(under_max),
    tv.transforms.ToTensor(),
    tv.transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
])

parser = argparse.ArgumentParser(description='Image Captioning')
parser.add_argument('--path', type=str, help='path to image', default="/Users/jacky/PycharmProjects/Thesis/catr/test_examples/child.jpeg")
parser.add_argument('--v', type=str, help='version', default='v3')
parser.add_argument('--checkpoint', type=str, help='checkpoint path', default=None)
args = parser.parse_args()
image_path = args.path
version = args.v
checkpoint_path = args.checkpoint

config = Config()

if version == 'v1':
    model = torch.hub.load('saahiluppal/catr', 'v1', pretrained=True)
elif version == 'v2':
    model = torch.hub.load('saahiluppal/catr', 'v2', pretrained=True)
elif version == 'v3':
    model = torch.hub.load('saahiluppal/catr', 'v3', pretrained=True)

tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')




def create_caption_and_mask(start_token, max_length):
    caption_template = torch.zeros((1, max_length), dtype=torch.long)
    mask_template = torch.ones((1, max_length), dtype=torch.bool)

    caption_template[:, 0] = start_token
    mask_template[:, 0] = False

    return caption_template, mask_template


# caption, cap_mask = create_caption_and_mask(
#     start_token, config.max_position_embeddings)


# @torch.no_grad()
# def evaluate():
#     model.eval()
#     for i in range(config.max_position_embeddings - 1):
#         predictions = model(image, caption, cap_mask)
#         predictions = predictions[:, i, :]
#         predicted_id = torch.argmax(predictions, axis=-1)
#
#         if predicted_id[0] == 102:
#             return caption
#
#         caption[:, i+1] = predicted_id[0]
#         cap_mask[:, i+1] = False
#
#     return caption

@torch.no_grad()
def evaluate(image, caption, cap_mask):
    model.eval()
    for i in range(config.max_position_embeddings - 1):
        predictions = model(image, caption, cap_mask)
        predictions = predictions[:, i, :]
        predicted_id = torch.argmax(predictions, axis=-1)

        if predicted_id[0] == 102:
            return caption

        caption[:, i+1] = predicted_id[0]
        cap_mask[:, i+1] = False

    return caption
output_list = []
base_path = "/Users/jacky/PycharmProjects/Thesis/catr/test_examples/"
for i in range(0,1):
    start_token = tokenizer.convert_tokens_to_ids([tokenizer._cls_token])[0]
    end_token = tokenizer.convert_tokens_to_ids([tokenizer._sep_token])[0]
    caption1, cap_mask1 = create_caption_and_mask(
        start_token, config.max_position_embeddings)
    image1 = Image.open(base_path+str(i)+".png")
    image1 = val_transform(image1)
    image1 = image1.unsqueeze(0)
    output = evaluate(image1,caption1,cap_mask1)
    result = tokenizer.decode(output[0].tolist(), skip_special_tokens=True)
    output_list.append(result.capitalize())
#result = tokenizer.decode(output[0], skip_special_tokens=True)
print(output_list)

for i in output_list:
    print(i)