import requests
import json
from PIL import Image
from io import BytesIO
import webbrowser
from auth_token import auth_token

url = "https://stablediffusionapi.com/api/v3/text2img"

payload = json.dumps({
    "key": auth_token,  # Use the API key from auth_token.py
    "prompt": "ultra realistic close up portrait ((beautiful pale cyberpunk female with heavy black eyeliner))",
    "negative_prompt": None,
    "width": "512",
    "height": "512",
    "samples": "1",
    "num_inference_steps": "20",
    "seed": None,
    "guidance_scale": 7.5,
    "safety_checker": "yes",
    "multi_lingual": "no",
    "panorama": "no",
    "self_attention": "no",
    "upscale": "no",
    "embeddings_model": None,
    "webhook": None,
    "track_id": None
})

headers = {
    'Content-Type': 'application/json'
}

response = requests.post(url, headers=headers, data=payload)

if response.status_code == 200:
    data = response.json()
    image_url = data['output'][0]

    # Display the generated image in a web browser
    webbrowser.open(image_url)
else:
    print("API request failed.")
