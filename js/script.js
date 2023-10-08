document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.querySelector(".text-input");
    const selectMenu = document.querySelector('.select-menu select');
    const saveBtn = document.querySelector(".save-btn");
    selectMenu.addEventListener("change", () => {
        const selectedFormat = selectMenu.options[selectMenu.selectedIndex].text;
        saveBtn.innerText = `Save As ${selectedFormat.split(" ")[0]} File`;
    });

    // for edit
    textarea.addEventListener('input',  autoResize);
    textarea.addEventListener('keyup', updatePreview);

    function autoResize() {
        // Set the height to the scrollHeight
        textarea.style.height = (textarea.scrollHeight) + 'px';
    }




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

function updatePreview(e) {
    let previewElement = document.getElementById("preview");
    let editorValue = document.getElementById("editor").value;


    let markedUpHTML = marked(findImgMatch(editorValue));
    createPages(markedUpHTML);
}

function createPages(editorValue) {

    let newPages = false;
    const occurrences = editorValue.split('<hr>');
    const track = document.querySelector('.output-area');
    const pages = Array.from(track.children);

    // dots
    const dots = document.querySelector('.carousel__nav');

    // Ensure there are enough pages
    while (occurrences.length > pages.length) {
        const newLi = document.createElement('li');
        newLi.className = 'text-output';
        track.appendChild(newLi);
        pages.push(newLi); // Add the new page to the pages array
        addCurrentToLast(track);

        newPages = true;
        // dots 
        

    }

    // Remove extra pages if there are more pages than occurrences
    while (occurrences.length < pages.length) {
        const extraPage = pages.pop(); // Remove the last page
        track.removeChild(extraPage); // Remove it from the DOM
        addCurrentToLast(track);

        newPages = true;
    }

        // Update the innerHTML for each page
        for (let i = 0; i < occurrences.length; i++) {
            pages[i].innerHTML = occurrences[i];
    
            if (newPages) {
                if (i === 0) {
                    while (dots.firstChild) {
                        dots.removeChild(dots.firstChild);
                      }
                }
    
                const newdot = document.createElement('button');
                newdot.className = 'carousel__indicator';
                dots.appendChild(newdot);
    
            }
    
        }

    if (newPages) {
        const allCurrent = document.querySelectorAll('.current-dot') || [];
        if (allCurrent.length > 0) {
            allCurrent.forEach(x => x.classList.remove('current-dot'));
        }
        const lastSiblingdot = document.querySelector('.carousel__indicator:last-child');
        lastSiblingdot.classList.add('current-dot');
    }


}

function addCurrentToLast(track) {
    const allCurrent = track.querySelectorAll('.current-page') || [];
    if (allCurrent.length > 0) {
        allCurrent.forEach(x => x.classList.remove('current-page'));
    }

    const lastSibling = track.querySelector('.text-output:last-child');
    lastSibling.classList.add('current-page');
}

function findImgMatch(editorValue){

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

    return editorValue
}

// Funktion för att ändra höjden på textarea baserat på innehållet


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


