const fontClasses = {
    poppins: 'text-output',
    butterflyKids: 'text-output.butterflyKids',
    heebo: 'text-output.heebo',
    homemadeApple: 'text-output.homemadeApple',
    inconsolata: 'text-output.inconsolata',
    marcellus: 'text-output.marcellus',
    tenorSans: 'text-output.tenorSans',
    theGirlNextDoor: 'text-output.theGirlNextDoor'
};

//const inputChangeFont = document.querySelector('#fontSelect');

//function test(e){
    //const inputTextBox = document.querySelector('.text-input');
    //const outputTextBox = document.querySelector('.text-output');
    //inputTextBox.style.fontFamily = e.target.value;
    //outputTextBox.style.fontFamily = e.target.value;
//}

//inputChangeFont.addEventListener('change', test);

const fontSelect = document.getElementById('fontSelect');
const previewElement = document.getElementById('preview');

fontSelect.addEventListener('change', function() {
    const selectedFont = this.value;

    // Add the class corresponding to the selected font
    previewElement.className = fontClasses[selectedFont];
});

document.addEventListener("DOMContentLoaded", function () {
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
        const fileNameInput = document.querySelector(".file-name input");
        if (selectedFormat === "Text File (.txt)"){
        const blob = new Blob([textarea.value], { type: selectMenu.value });
        const fileUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = fileNameInput.value;
        link.href = fileUrl;
        link.click();
        }
        if (selectedFormat === "PDF (.pdf)"){
            console.log(window);
            Convert_HTML_To_PDF(fileNameInput.value);
            // Convert HTML content to PDF         
        }
        if (selectedFormat === "Word (.docx)"){
            console.log(selectedFormat);
            const blob = new Blob([textarea.value], { type: selectMenu.value });
            const fileUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.download = fileNameInput.value;
            link.href = fileUrl;
            link.click();
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
    const doc = new window.jsPDF('p', 'pt', 'a3');
    
    // Source HTMLElement or a string containing HTML.
    const elementHTML = document.querySelector("#content");

    doc.html(elementHTML, {
        callback: function(doc) {
            // Save the PDF
            doc.save(fileName);
        },
        margin: [10, 10, 10, 10],
        autoPaging: 'text',
        x: 0,
        y: 0,
        width: 190, //target width in the PDF document
        windowWidth: 805 //window width in CSS pixels
    });
}

