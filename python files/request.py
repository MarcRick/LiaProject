import requests
import json

url = "https://stablediffusionapi.com/api/v3/text2img"

def makeIMG (prompt):
  payload = json.dumps({
    "key": "8VmbbQP624v2qxel6v5Lzy1GKbeTONX8LOFtiY6QsMDyNbbW6mSwIrtBMNHM",
    "prompt": prompt,
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
    "embeddings_model": null,
    "webhook": None,
    "track_id": None
  })

  headers = {
  'Content-Type': 'application/json'
  }
  response = requests.request("POST", url, headers=headers, data=payload)
  print(response.json)

def fetchIMG():
  {
    "status": "success",
    "generationTime": 1.3200268745422363,
    "id": 12202888,
    "output": [
      "https://pub-8b49af329fae499aa563997f5d4068a4.r2.dev/generations/e5cd86d3-7305-47fc-82c1-7d1a3b130fa4-0.png"
    ],
    "meta": {
      "H": 512,
      "W": 512,
      "enable_attention_slicing": "true",
      "file_prefix": "e5cd86d3-7305-47fc-82c1-7d1a3b130fa4",
      "guidance_scale": 7.5,
      "model": "runwayml/stable-diffusion-v1-5",
      "n_samples": 1,
      "negative_prompt": " ((out of frame)), ((extra fingers)), mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), (((tiling))), ((naked)), ((tile)), ((fleshpile)), ((ugly)), (((abstract))), blurry, ((bad anatomy)), ((bad proportions)), ((extra limbs)), cloned face, glitchy, ((extra breasts)), ((double torso)), ((extra arms)), ((extra hands)), ((mangled fingers)), ((missing breasts)), (missing lips), ((ugly face)), ((fat)), ((extra legs))",
      "outdir": "out",
      "prompt": "ultra realistic close up portrait ((beautiful pale cyberpunk female with heavy black eyeliner)) DSLR photography, sharp focus, Unreal Engine 5, Octane Render, Redshift, ((cinematic lighting)), f/1.4, ISO 200, 1/160s, 8K, RAW, unedited, symmetrical balance, in-frame",
      "revision": "fp16",
      "safetychecker": "no",
      "seed": 3499575229,
      "steps": 20,
      "vae": "stabilityai/sd-vae-ft-mse"
    }
  }