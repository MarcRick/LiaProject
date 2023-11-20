document.addEventListener("DOMContentLoaded", function () {
    const textEditor = document.querySelector('#editor');
    const generateButton = document.getElementById("generateButton");
    const imageContainer = document.getElementById("imageContainer");
    const getPicture = document.getElementById("promptInput");
    const basePromptStyle = document.getElementById("styleSelect");
    let promptStyle = ", Fantasy";
    const saveButton = document.getElementById("saveGeneratedIMG")
    let fetchedIMG = "";



    basePromptStyle.addEventListener('change', function () {
        const selectedStyle = this.value;

        switch (selectedStyle) {
            case 'Pixel-art':
                promptStyle = ", Pixel-art";
                break;
            case 'Fantasy':
                promptStyle = ", Fantasy";
                break;
            case 'Sci-fi':
                promptStyle = ", Sci-fi";
                break;
            case 'Dark-fantasy':
                promptStyle = ", Dark Fantasy";
                break;
            case 'Childish-fantasy':
                promptStyle = ", Childish fantasy";
                break;
            case 'Gore':
                promptStyle = ", gore";
                break;
            case 'Reality-based':
                promptStyle = ", Reality-based";
                break;
            case 'Oil-painting':
                promptStyle = ", Oil-Painting";
                break;
        }
        selectedStyle = promptStyle;
    });


    generateButton.addEventListener("click", async () => {
        try {
            const response = await fetch("https://stablediffusionapi.com/api/v3/text2img", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "key": "8VmbbQP624v2qxel6v5Lzy1GKbeTONX8LOFtiY6QsMDyNbbW6mSwIrtBMNHM",
                    "prompt": getPicture.value + promptStyle,
                    "negative_prompt": null,
                    "width": "1024",
                    "height": "320",
                    "samples": "1",
                    "num_inference_steps": "20",
                    "seed": null,
                    "guidance_scale": 7.5,
                    "safety_checker": "yes",
                    "multi_lingual": "no",
                    "panorama": "no",
                    "self_attention": "no",
                    "upscale": "no",
                    "embeddings_model": null,
                    "webhook": null,
                    "track_id": null
                })
            });

            if (response.ok) {
                console.log(getPicture.value + promptStyle);
                const data = await response.json();
                const imageUrl = data.output[0];
                localStorage.setItem(getPicture.value, imageUrl);
                //imageContainer.innerHTML = `<img src="${imageUrl}" alt="Generated Image">`;
                const newText = `![](${getPicture.value})`;
                textEditor.value += newText;
                updatePreview();

            }
            else {
                console.error("API request failed.");
            }
        }
        catch (error) {
            console.error("An error occurred:", error);
        }
    });
    saveButton.addEventListener("click", function () {
        const fileName = imageContainer.files[0].name;
        console.log(fileName);
        var a = document.createElement("a");
        a.href = imageContainer.src;

        a.download = `${fileName}.jpg`;
        a.click();
        ///reader.readAsDataURL();


        ///const inputImg = document.querySelector('.img-input');

        ///inputImg.addEventListener('change', saveImg);
    });

});

/*reader.addEventListener('load', () => {
    const fileName = inputImg.files[0].name;
    localStorage.setItem(fileName, reader.result);
    const allText = editText.value;
    const newText = `![](${fileName})`;
    const updatedText = allText + newText;
    editText.value = updatedText;
    updatePreview();
});*/
