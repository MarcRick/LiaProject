var textKey = [];
var textKeyIndex = 0;

const appliedFonts = [];
let pageIndex = 0;

document.addEventListener("DOMContentLoaded", function () {

    const fontSelect = document.getElementById("fontSelect");
    const previewElement = document.getElementById("preview");
    let selectedFontFamily = '';   
    

    fontSelect.addEventListener('change', function () {
        const selectedFont = this.value;
        //const selectedFontFamily = getFontFamily(selectedFont);

        // Apply the selected font family to all pages
        /*const pages = document.querySelectorAll('.text-output');
        pages.forEach(page => {
            page.style.fontFamily = selectedFontFamily;
        });*/

        switch (selectedFont) {
            case 'poppins':
                selectedFontFamily = "'Poppins', sans-serif";
                break;
            case 'butterflyKids':
                selectedFontFamily = "'Butterfly Kids', cursive";
                break;
            case 'heebo':
                selectedFontFamily = "'Heebo', sans-serif";
                break;
            case 'homemadeApple':
                selectedFontFamily = "'Homemade Apple', cursive";
                break;
            case 'inconsolata':
                selectedFontFamily = "'Inconsolata', monospace";
                break;
            case 'marcellus':
                selectedFontFamily = "'Marcellus', serif";
                break;
            case 'tenorSans':
                selectedFontFamily = "'Tenor Sans', sans-serif";
                break;
            case 'theGirlNextDoor':
                selectedFontFamily = "'The Girl Next Door', cursive";
                break;
        }
        previewElement.style.fontFamily = selectedFontFamily;
        storeAppliedFont(selectedFont);
    });

    const layoutSelect = document.getElementById("layoutSelect");
    const inputLayout = document.getElementById("contentBox");
    const navSize = document.getElementById("carouselBtn")

    layoutSelect.addEventListener('change', function () {
        const selectedLayout = layoutSelect.value;

        if (selectedLayout === 'CB') {
            inputLayout.style.width = "10in";
            inputLayout.style.height = "7in";
            navSize.style.width = "10in";
        } else if (selectedLayout === 'PB') {
            inputLayout.style.width = "5.8in";
            inputLayout.style.height = "8.3in";
            navSize.style.width = "5.8in";
        }
        
    });


    const textarea = document.querySelector("textarea");
    const selectMenu = document.querySelector('.select-menu select');
    const saveBtn = document.querySelector(".save-btn");
    selectMenu.addEventListener("change", () => {
        const selectedFormat = selectMenu.options[selectMenu.selectedIndex].text;

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

function changeIMGLayout() {
    const positionSelect = document.getElementById('picturePlacement');
    const selectedPosition = positionSelect.value;

    const styleSheet = document.styleSheets[0];
    const rules = styleSheet.cssRules;

    for (let i = 0; i < rules.length; i++) {
        if (rules[i].selectorText === '.textOutput img') {
            const rule = rules[i];
            if (selectedPosition === 'Bottom') {
                rule.style.bottom = rule.style.top;
                rule.style.removeProperty('Top');
            } else {
                rule.style.top = rule.style.bottom;
                rule.style.removeProperty('Bottom');
            }
        }
    }
};

function updatePreview(e) {
    let previewElement = document.getElementById("preview");
    let editorValue = document.getElementById("editor").value;


    let markedUpHTML = marked(findImgMatch(editorValue));
    createPages(markedUpHTML);
}



function createPages(editorValue) {

    let newPages = false;
    const occurrences = editorValue.split('<hr>'); // split the input into two, when <hr>(---) is typed in 
    const track = document.querySelector('.output-area'); // track points to the text output area
    const pages = Array.from(track.children);  // pages is an array made of child elements in the track (<li> element which is in the <ul>)
    // dots
    const dots = document.querySelector('.carousel__nav');
    // Ensure there are enough pages
    while (occurrences.length > pages.length) {
        const newLi = document.createElement('li');
        newLi.className = 'textOutput';
        track.appendChild(newLi); 
        pages.push(newLi); // Add the new page to the pages array
        addCurrentToLast(track);
        newPages = true;
        // dots        

        // Add an event listener for the fontSelect dropdown's change event
        const fontSelect = document.getElementById('fontSelect');
        fontSelect.addEventListener('change', function () {
            moveCursorToNextLine()
            const selectedFontFamily= applyFontStyle(newLi); // Reapply font style when font selection changes 
            storeAppliedFont(selectedFontFamily)  
        });
                      
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



        const leftButton = document.querySelector('.carousel__button--left');
        if (pages.length > 1) {
            leftButton.classList.remove('is-hidden')
        }
        else {
            leftButton.classList.add('is-hidden');
            const rightButton = document.querySelector('.carousel__button--right');
            rightButton.classList.add('is-hidden');
        }
    }
}



function applyFontStyle(page) {

    const selectedFont = document.getElementById('fontSelect').value;
    let selectedFontFamily = '';

    switch (selectedFont) {
        case 'poppins':
            selectedFontFamily = "'Poppins', sans-serif";
            break;
        case 'butterflyKids':
            selectedFontFamily = "'Butterfly Kids', cursive";
            break;
        case 'heebo':
            selectedFontFamily = "'Heebo', sans-serif";
            break;
        case 'homemadeApple':
            selectedFontFamily = "'Homemade Apple', cursive";
            break;
        case 'inconsolata':
            selectedFontFamily = "'Inconsolata', monospace";
            break;
        case 'marcellus':
            selectedFontFamily = "'Marcellus', serif";
            break;
        case 'tenorSans':
            selectedFontFamily = "'Tenor Sans', sans-serif";
            break;
        case 'theGirlNextDoor':
            selectedFontFamily = "'The Girl Next Door', cursive";
            break;
        default:
            selectedFontFamily = "'Poppins', sans-serif"; // Default to the browser's default font
            break;
    }

    page.style.fontFamily = selectedFontFamily;
    return selectedFontFamily;
}

function moveCursorToNextLine() {
    const inputElement = document.getElementById('editor');
    const cursorPosition = inputElement.selectionStart; // Get the current cursor position

    // Insert a newline character only if the cursor is not already at the beginning of a line
    const text = inputElement.value;
    const previousChar = cursorPosition > 0 ? text[cursorPosition - 1] : '';
    const nextChar = cursorPosition < text.length ? text[cursorPosition] : '';

    if (previousChar !== '\n' && nextChar !== '\n') {
        // Insert a newline character at the cursor position
        const newText = text.substring(0, cursorPosition) + '\n' + text.substring(cursorPosition);
        inputElement.value = newText;

        // Set the new cursor position to the beginning of the next line
        inputElement.selectionStart = cursorPosition + 1;
        inputElement.selectionEnd = cursorPosition + 1;
    }

    // Focus on the textarea to ensure it has focus after the cursor movement
    inputElement.focus();
}

function storeAppliedFont(selectedFont) {
    pageIndex++;
    appliedFonts.push({ pageIndex, selectedFont });
}


function ChangeIMGLayout() {
    const positionSelect = document.getElementById('positionSelect');
    const selectedPosition = positionSelect.value;

    const styleSheet = document.styleSheets[0];
    const rules = styleSheet.cssRules;

    for (let i = 0; i < rules.length; i++) {
        if (rules[i].selectorText === '.textOutput img') {
            const rule = rules[i];
            if (selectedPosition === 'bottom') {
                rule.style.bottom = rule.style.top;
                rule.style.removeProperty('top');
            } else {
                rule.style.top = rule.style.bottom;
                rule.style.removeProperty('bottom');
            }
        }
    }
}

function findImgMatch(editorValue) {

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


function addCurrentToLast(track) {
    const allCurrent = track.querySelectorAll('.current-page') || [];
    if (allCurrent.length > 0) {
        allCurrent.forEach(x => x.classList.remove('current-page'));
    }

    const lastSibling = track.querySelector('.textOutput:last-child');
    lastSibling.classList.add('current-page');
}

function Convert_HTML_To_PDF(fileName) {
    const elements = document.querySelectorAll(".output-area li");

    // Create an array to store the content for each page
    const pages = [];

    elements.forEach((element, index) => {
        // Add a page break before each item except the first one
        if (index > 0) {
            pages.push('<div style="page-break-before: always;"></div>');
        }

        // Extract the font information from the appliedFonts array
        if (appliedFonts[index]) {
            const selectedFont = appliedFonts[index];
            // Add the content of the list item with the specified font
            pages.push(`<div style="font-family: ${selectedFont};">${element.innerHTML}</div>`);
        } else {
            // Fallback to a default font if the font information is missing
            pages.push(`<div style="font-family: 'Poppins';">${element.innerHTML}</div>`);
        }
    });

    // Combine the pages into a single HTML string
    const htmlContent = pages.join('');

    // Define the PDF generation options
    const opt = {
        margin: [10, 5, 10, 5],
        filename: fileName
    };

    // Use the html2pdf library to generate the PDF
    html2pdf(htmlContent, opt);
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