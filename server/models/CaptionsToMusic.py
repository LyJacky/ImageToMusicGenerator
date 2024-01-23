import pandas as pd  # for lookup in annotation file
from gradientai import Gradient
import os
def to_musical(caption):
    os.environ['GRADIENT_ACCESS_TOKEN'] = "CU8eYAvpeWDPtehkN8WpnIdV0Ez21g6H"
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
      # base_model = gradient.get_base_model(base_model_slug="nous-hermes2")
      new_model_adapter = gradient.get_model_adapter(model_adapter_id="55ecf946-ca7b-4d14-9c42-686c3f7cffdc_model_adapter")

      # new_model_adapter = base_model.create_model_adapter(
      #     name="test model 3"
      # )
      # print(new_model_adapter)
      # print(f"Created model adapter with id {new_model_adapter.id}")
      sample_query = "### Instruction: Can you describe the type of music that would fit this image caption: "+caption+"? \n\n### Response:"
      # print(f"Asking: {sample_query}")

      # before fine-tuning
      completion = new_model_adapter.complete(query=sample_query, max_generated_token_count=100).generated_output
      # print(f"Generated (before fine-tune): {completion}")
      return completion
      # samples = res
      #
      # # this is where fine-tuning happens
      # # num_epochs is the number of times you fine-tune the model
      # # more epochs tends to get better results, but you also run the risk of "overfitting"
      # # play around with this number to find what works best for you
      # num_epochs = 3
      # count = 0
      # while count < num_epochs:
      #     print(f"Fine-tuning the model, iteration {count + 1}")
      #     new_model_adapter.fine_tune(samples=samples)
      #     count = count + 1
      #
      # # after fine-tuning
      # completion = new_model_adapter.complete(query=sample_query, max_generated_token_count=100).generated_output
      # print(f"Generated (after fine-tune): {completion}")

      # new_model_adapter.delete()

if __name__ == "__main__":
    to_musical("testing")