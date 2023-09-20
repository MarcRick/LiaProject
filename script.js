const textarea = document.querySelector("textarea"),
    fileNameInput = document.querySelector(".file-name input"),
    selectMenu = document.querySelector(".save-as select"),
    saveBtn = document.querySelector(".save-btn");

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