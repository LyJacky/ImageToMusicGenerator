import pandas as pd  # for lookup in annotation file
from gradientai import Gradient
import os
def to_musical(caption):
    os.environ['GRADIENT_ACCESS_TOKEN'] = "rWG6PwpbP12OwXF2dDnjLgVa9Q1bm7NC"
    os.environ['GRADIENT_WORKSPACE_ID'] = "248985c9-fe68-46b8-b9d5-b8dc76d9ed33_workspace"
    # df = pd.read_csv('data/input.txt')
    # Get img, caption columns
    # captions = df["caption"]
    # musical = df["musical"]
    # print(captions)
    # print(len(captions))
    # res = []
    # for i in range(1119,1219):
    #     res.append({
    #                    'inputs': "### Instructions: Can you briefly describe the type of music that would go well with this image caption?:" +
    #                              captions[i] + "\n\n### Response:" + musical[i]})

    # print(res)
    with Gradient() as gradient:
      new_model_adapter = gradient.get_model_adapter(model_adapter_id="55ecf946-ca7b-4d14-9c42-686c3f7cffdc_model_adapter")
      sample_query = " Can you describe the type of music that would fit this image caption:"+ caption
      completion = new_model_adapter.complete(query=sample_query, max_generated_token_count=100).generated_output
      # print(f"Generated (before fine-tune): {completion}")
      return completion

if __name__ == "__main__":
    print(to_musical("The effeil tower"))