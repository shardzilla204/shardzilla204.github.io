let currentChapterIdentifier = '';
function createChapter() {
    const identifier = createChapterIdentifier();
    currentChapterIdentifier = identifier;
    
    const chapter = createChapterElement();
    chapter.element.id = identifier;
    chapter.button.id = identifier;
    
    const chapters = document.querySelector("#chapters");
    const edit = clearEditElement();

    chapters.appendChild(chapter.button);
    edit.appendChild(chapter.element);
}

function createChapterElement()
{
    const element = document.createElement("div");
    const button = document.createElement("button");
    const details = createDetails(button, element);
    const chapter = { 
        element: element, 
        button: button, 
        details: details 
    };
    createDetailsElement(chapter);

    button.addEventListener("click", () => {
        currentChapterIdentifier = button.id;
        details.title.value = '';
        details.content.value = '';
        const editChapter = clearEditElement();
        editChapter.appendChild(chapter.element);
    });

    return chapter;
}

function createChapterIdentifier()
{
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 12; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
        if (i % 4 == 3) {
            result += '-';
        }
    }
    result = result.slice(0, -1);
    return result;
}

function createRemoveButton(chapter) {
    const button = document.createElement("button");
    button.textContent = "Remove Chapter";
    button.addEventListener("click", () => {
        chapter.element.remove();
        chapter.button.remove();
    });
    return button;
}

function getDetails()
{
    const chapter = document.querySelector("div#" + currentChapterIdentifier);
    if (chapter != null) {
        const title = chapter.querySelector("#title").value;
        const content = chapter.querySelector("#content").value;
        return { title: title, content: content }
    }
}

function setDetails()
{
    const chapter = document.querySelector("div#" + currentChapterIdentifier);
}

function createDetails(button, element) {
    const title = document.createElement("input");
    title.id = "title";
    title.placeholder = "New Chapter";
    title.addEventListener("input", () => {
        const chapter = document.querySelector("div#" + currentChapterIdentifier);
        title.value = chapter.querySelector("#title").value;
        
        if (element.id != currentChapterIdentifier) return;
        
        if (document.querySelector(`#${title.id}`).value == "") {
            button.textContent = chapter.querySelector("#title").placeholder;
        } 
        else {
            button.textContent = chapter.querySelector("#title").value;
        }
    });
    
    const content = document.createElement("textarea");
    content.id = "content";
    content.placeholder = "Chapter Content";
    content.addEventListener("input", () => {
        content.value = document.getElementById(content.id).value;
    });

    if (title.value != '') {
        button.textContent = title.value;
    }
    else {
        button.textContent = title.placeholder;
    }

    return { title: title, content: content };
}

function createDetailsElement(chapter) {
    chapter.element.appendChild(document.createElement("br"));
    chapter.element.appendChild(chapter.details.title);
    chapter.element.appendChild(document.createElement("br"));
    chapter.element.appendChild(chapter.details.content);
    chapter.element.appendChild(document.createElement("br"));
    chapter.element.appendChild(createRemoveButton(chapter));
}

function clearEditElement()
{
    const edit = document.querySelector("#edit");
    if (edit.hasChildNodes()) {
        edit.childNodes.forEach(childNode => {
            childNode.remove();
        });
    }
    return edit;
}
