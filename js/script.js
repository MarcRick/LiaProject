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
    });

    const realFileBtn = document.getElementById("real-file")
    const customBtn = document.getElementById("custom-button")
    const customTxt = document.getElementById("custom-text")

    customBtn.addEventListener("click", function () {
        realFileBtn.click(); 
    });

    realFileBtn.addEventListener("change", function () {
        if (realFileBtn.value) {
            customTxt.innerHTML = realFileBtn.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/);
        }
        else {
            customTxt.innerHTML = "No File Chosen"
        }
    });


});

function updatePreview() {
    let previewElement = document.getElementById("preview");
    let editorValue = document.getElementById("editor").value;
    let markedUpHTML = marked(editorValue);
    previewElement.innerHTML = markedUpHTML;
}
// Funktion för att ändra höjden på textarea baserat på innehållet
function autoResize(textarea) {
textarea.style.height = 'auto'; // Återställ höjden till auto för att mäta rätt höjd
textarea.style.height = (textarea.scrollHeight) + 'px'; // Sätt höjden till scrollhöjden
}

function Convert_HTML_To_PDF(fileName) {
    const doc = new window.jsPDF('p', 'pt', 'a4');
    
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
