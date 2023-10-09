var textKey = [];
var textKeyIndex = 0;

document.addEventListener("DOMContentLoaded", function () {

    const fontSelect = document.getElementById("fontSelect");
    const previewElement = document.getElementById("preview");

    fontSelect.addEventListener('change', function () {
        const selectedFont = this.value;
        let fontFamily = '';

        switch (selectedFont) {
            case 'butterflyKids':
                fontFamily = "'Butterfly Kids', cursive";
                break;
            case 'heebo':
                fontFamily = "'Heebo', sans-serif";
                break;
            case 'homemadeApple':
                fontFamily = "'Homemade Apple', cursive";
                break;
            case 'inconsolata':
                fontFamily = "'Inconsolata', monospace";
                break;
            case 'marcellus':
                fontFamily = "'Marcellus', serif";
                break;
            case 'tenorSans':
                fontFamily = "'Tenor Sans', sans-serif";
                break;
            case 'theGirlNextDoor':
                fontFamily = "'The Girl Next Door', cursive";
                break;
        }
        previewElement.style.fontFamily = fontFamily;
    });

    const textarea = document.querySelector("textarea");
    const selectMenu = document.querySelector('.select-menu select');
    const saveBtn = document.querySelector(".save-btn");
    selectMenu.addEventListener("change", () => {
        const selectedFormat = selectMenu.options[selectMenu.selectedIndex].text;
        saveBtn.innerText = `Save As ${selectedFormat.split(" ")[0]} File`;
    });

    saveBtn.addEventListener("click", () => {
        const selectedFormat = selectMenu.options[selectMenu.selectedIndex].text;
        console.log(selectedFormat);
        const fileNameInput = document.querySelector(".option input");
        if (selectedFormat === "Text File (.txt)") {
            const blob = new Blob([textarea.value], { type: selectMenu.value });
            const fileUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.download = fileNameInput.value;
            link.href = fileUrl;
            link.click();
            localStorage.clear();
        }
        if (selectedFormat === "PDF (.pdf)") {
            console.log(window);

            Convert_HTML_To_PDF(fileNameInput.value);
            localStorage.clear();
            // Convert HTML content to PDF         
        }
        if (selectedFormat === "Word (.docx)") {
            console.log(selectedFormat);
            const blob = new Blob([textarea.value], { type: selectMenu.value });
            const fileUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.download = fileNameInput.value;
            link.href = fileUrl;
            link.click();
            localStorage.clear();
        }
    });

    function saveImg() {
        const reader = new FileReader();
        const editText = document.querySelector('#editor');

        reader.addEventListener('load', () => {
            const fileName = inputImg.files[0].name;
            localStorage.setItem(fileName, reader.result);
            const allText = editText.value;
            const newText = `![](${fileName})`;
            const updatedText = allText + newText;
            editText.value = updatedText;
            updatePreview();
        });

        reader.readAsDataURL(this.files[0]);
    }

    const inputImg = document.querySelector('.img-input');

    inputImg.addEventListener('change', saveImg);


});

function updatePreview() {
    let previewElement = document.getElementById("preview");
    let editorValue = document.getElementById("editor").value;

    // Hitta alla matchningar av ![](...) i texten
    let matches = editorValue.match(/!\[([^\]]*)\]\((.*?)\)/g);

    // Replace matches with imgDataUrl from localStorage
    if (matches) {

        editorValue = editorValue.replace(/!\[([^\]]*)\]\((.*?)\)/g
            , (match, altText, key) => {
                const imgDataUrl = localStorage.getItem(key);
                if (imgDataUrl) {
                    return `![${altText}](${imgDataUrl})`;
                } else {
                    // If imgDataUrl not found in localStorage, you can handle it here.
                    return match; // Keep the original text if no replacement is available.
                }
            });

    }

    let markedUpHTML = marked(editorValue);
    previewElement.innerHTML = markedUpHTML;
}

// Funktion för att ändra höjden på textarea baserat på innehållet
function autoResize(textarea) {
    textarea.style.height = 'auto'; // Återställ höjden till auto för att mäta rätt höjd
    textarea.style.height = (textarea.scrollHeight) + 'px'; // Sätt höjden till scrollhöjden
}

function Convert_HTML_To_PDF(fileName) {
    const element = document.getElementById("content");
    const opt = {
        margin: [10, 5, 10, 5],
        filename: fileName,
        pagebreak: { mode: 'avoid-all', before: '#page2el' }
    };

    html2pdf(element, opt);
}

var isToggled = false;
function toggleInfo() {
    var showDiv = document.getElementById('extraText');

    if (isToggled) {
        showDiv.style.display = 'none';
        console.log(isToggled)
    } else {
        showDiv.style.display = 'block';
        console.log(isToggled)
    }
    isToggled = !isToggled;
}

function saveTextLS() {
    const textValue = document.getElementById("editor").value;
    console.log(textValue);
    localStorage.setItem(window.textKeyIndex, textValue);
    window.textKey.push(textValue);
    document.getElementById("editor").value = "";
    window.textKeyIndex += 1;
    console.log(window.textKey);
    const newPage = document.createElement('div');
    document.getElementById('editor').appendChild(newPage);

    updateContent();
}
function previousPage() {
    if (window.textKeyIndex > 0) {
        window.textKeyIndex -= 1;
        console.log(textKeyIndex)
        const currentPageText = localStorage.getItem(window.textKeyIndex);
        console.log(currentPageText)
        document.getElementById('editor').value = currentPageText || "";
    }
    console.log(textKeyIndex)
    updateContent();
}
function nextPage() {
    if (window.textKeyIndex < textKey.length) {
        window.textKeyIndex += 1;
        console.log(textKeyIndex)
        const currentPageText = localStorage.getItem(window.textKeyIndex);
        console.log(currentPageText)
        document.getElementById('editor').value = currentPageText || "";
    }
    console.log(textKeyIndex)
    updateContent();

}
function updateContent() {
    const showingPageText = localStorage.getItem(window.textKeyIndex);
    document.getElementById('preview').textContent = showingPageText || "";
}


function chosePage() {
    window.textKeyIndex = knappval;
    const Text = localStorage.getItem(window.textKey[textKeyIndex].value);
    document.getElementById("editor").value = Text.value;
}

//function addPage() {
//  console.log(totalPages);
// totalPages++;
//console.log(totalPages);
//const newPage = document.createElement('div');
//newPage.id = page${totalPages};
//newPage.className = 'page';
//newPage.textContent = Page ${totalPages} Content;
//document.getElementById('pageContainer').appendChild(newPage);
//}
