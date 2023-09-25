document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.querySelector("textarea");
    const fileNameInput = document.querySelector(".file-name input");
    const selectMenu = document.querySelector('.select-menu select');
    const saveBtn = document.querySelector(".save-btn");

    selectMenu.addEventListener("change", () => {
        const selectedFormat = selectMenu.options[selectMenu.selectedIndex].text;
        saveBtn.innerText = `Save As ${selectedFormat.split(" ")[0]} File`;
    });

    saveBtn.addEventListener("click", () => {
        const blob = new Blob([textarea.value], { type: selectMenu.value });
        const fileUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = fileNameInput.value;
        link.href = fileUrl;
        link.click();
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