function c() {
    if (typeof this === 'string' || typeof this === 'number' || typeof this === 'boolean') {
        console.log(this.toString());
    } else if (typeof this === 'function') {
        console.log(this.toString());
    } else if (Array.isArray(this)) {
        console.log(JSON.stringify(this));
    } else if (typeof this === 'object' && this !== null) {
        console.log(JSON.stringify(this));
    } else {
        console.log(this);
    }
}

String.prototype.c = c;
Number.prototype.c = c;
Boolean.prototype.c = c;
Array.prototype.c = c;
Object.prototype.c = c;
Function.prototype.c = c;

page = {
    "title": function (Title) {
        if (Title != undefined) {
            try {
                document.title = Title;
                return true;
            }
            catch (error) {
                console.log("Error in manupulating page title");
                return false;
            }
        }
        else {
            return document.title;
        }
    },
    "favicon": function (url = 'https://stackoverflow.com/favicon.ico') {
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.href = url;
    },
    "divide": function (...parts) {
        let parent = document.createElement("div");
        parent.style.display = "flex";
        parent.style.flexDirection = "column";
        let i = 1; 
        try {
            while (i < parts.length) { 
                let child = document.createElement("div");
                child.classList.add("child");
                child.style.width = `${parts[i]}vw`; 
                parent.appendChild(child);
                i++;
            }
        } catch (error) {
            console.error('An Error occurred at page.divide(), Error:', error);
        }
        $$$().then(function (el) {
            el.appendChild(parent);
        });
    },
    "css": function (url, callback=function(){}) {
        try {
            let styl = document.createElement('link');
            styl.rel = 'stylesheet';
            document.head.appendChild(styl);
            styl.href = url;
            if (callback && typeof callback === 'function') {
                callback(); 
            }
        } catch (e) {
            let style = document.querySelector("style");
            if (!style) {
                style = document.createElement('style');
                fetch(url)
                    .then(response => response.text())
                    .then(data => {
                        style.innerHTML = data;
                        document.head.appendChild(style);
                        if (callback && typeof callback === 'function') {
                            callback(); 
                        }
                    })
                    .catch(error => console.error('Error fetching CSS:', error));
            }
        }
    },
    "js": function (uri, callback=function(){}) {
        try {
            let scr = document.createElement('script');
            document.head.appendChild(scr);
            scr.src = uri;
            if (callback && typeof callback === 'function') {
                scr.onload = callback; 
            }
        } catch (e) {
            let scr = document.createElement('script');
            fetch(uri)
                .then(response => response.text())
                .then(data => {
                    scr.innerHTML = data;
                    document.head.appendChild(scr);
                    if (callback && typeof callback === 'function') {
                        callback(); 
                    }
                })
                .catch(error => console.error('Error fetching JS:', error));
        }
    }

};
Element.prototype.renderit = function (content) {
    if (this instanceof Element) {

        this.innerHTML += content;
    } else {
        console.error("renderin method used on wrong type.");
    }
};
Element.prototype.update = function (content) {
    if (this instanceof Element) {
        this.innerHTML = content;
    } else {
        console.error("update method used on wrong type.");
    }
};
function $$$(selector = "body", index = 0, returnarray = false) {
    return new Promise((resolve, reject) => {
        const onDOMContentLoaded = () => {
            try {
                const getElements = () => {
                    if (!returnarray) {
                        const element = document.querySelectorAll(selector)[index];
                        if (element) {
                            resolve(element);
                            return true; // Found the element
                        }
                    } else {
                        const elements = document.querySelectorAll(selector);
                        if (elements.length > 0) {
                            resolve(Array.from(elements));
                            return true; // Found elements
                        }
                    }
                    return false; // No elements found
                };

                if (getElements()) return; // If found, exit

                // Set up a MutationObserver
                const observer = new MutationObserver(() => {
                    if (getElements()) {
                        observer.disconnect(); // Stop observing once found
                    }
                });

                observer.observe(document, { childList: true, subtree: true });
                
            } catch (error) {
                reject(`Error selecting element: ${error}`);
            }
        };

        if (document.readyState === 'loading') {
            document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
        } else {
            onDOMContentLoaded();
        }
    });
}

Element.prototype.$$$ = function(selector="body",index=0, returnarray=false){
    return new Promise((resolve, reject) => {
        const onDOMContentLoaded = () => {
            try {
                const getElements = () => {
                    if (!returnarray) {
                        const element = this.querySelectorAll(selector)[index];
                        if (element) {
                            resolve(element);
                            return true; // Found the element
                        }
                    } else {
                        const elements = this.querySelectorAll(selector);
                        if (elements.length > 0) {
                            resolve(Array.from(elements));
                            return true; // Found elements
                        }
                    }
                    return false; // No elements found
                };

                if (getElements()) return; // If found, exit

                // Set up a MutationObserver
                const observer = new MutationObserver(() => {
                    if (getElements()) {
                        observer.disconnect(); // Stop observing once found
                    }
                });

                observer.observe(document, { childList: true, subtree: true });
                
            } catch (error) {
                reject(`Error selecting element: ${error}`);
            }
        };

        if (document.readyState === 'loading') {
            document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
        } else {
            onDOMContentLoaded();
        }
    });
}

function searchAll(string, word) {
    let indices = [];
    let index = string.indexOf(word);

    while (index !== -1) {
        indices.push(index);
        index = string.indexOf(word, index + 1);
    }
    return indices;
}
function sliceBetween(what, to, string) {
    let slices = [];
    let startIndex = string.indexOf(what);

    while (startIndex !== -1) {
        let endIndex = string.indexOf(to, startIndex + 1);

        if (endIndex !== -1) {
            let slicedString = string.slice(startIndex + what.length, endIndex).trim();
            slices.push(slicedString);
            startIndex = string.indexOf(what, endIndex + to.length);
        } else {
            break;
        }
    }
    return slices;
}
function sliceAfterAndStop(what, string) {
    let slices = [];
    let index = string.indexOf(what);

    while (index !== -1) {
        let newlineIndex = string.indexOf('\n', index);
        let stopIndex = (newlineIndex !== -1) ? newlineIndex : string.length;

        if (stopIndex !== -1) {
            let slicedString = string.slice(index + what.length, stopIndex).trim();
            slices.push(slicedString);
            index = string.indexOf(what, stopIndex);
        } else {
            break;
        }
    }

    return slices;
}
function ready(callback) {

    if (document.readyState !== 'loading') {
        callback();
    } else { 
        document.addEventListener('DOMContentLoaded', callback);
    }
}
function unescapeHtml(html) {
        let textarea = document.createElement("textarea");
        textarea.innerHTML = html;
        setTimeout(function(){
            document.removeChild(textarea);
        },100);
        return textarea.value;
    }
function copy(data) {

    let unescapedText = unescapeHtml(data);

    navigator.clipboard.writeText(unescapedText)
        .then(() => {
            console.log("Text copied to clipboard:", unescapedText);

        })
        .catch(err => {
            console.error("Failed to copy text to clipboard:", err);

        });
}
String.prototype.copy = function() {
    copy(this);
};
Function.prototype.ready = function(){
    ready(this);
}
const escapeHtml = str => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function recordTime(fn){
    if (typeof fn != "function"){
        throw new Error("Invalid type of parameter passed to recordTime function! Only Function is allowed");
    }
    let stms = new Date().getMilliseconds();
    fn();
    let etms = new Date().getMilliseconds();
    console.log(etms-stms);
    return etms-stms;

} 

Element.prototype.addElement = function(element, attrs={}) {
  const ele = document.createElement(element);
  const keys = Object.keys(attrs);
  
  for (let i = 0; i < keys.length; i++) {
    ele.setAttribute(keys[i], attrs[keys[i]]);
  } 
  
  this.appendChild(ele);
  return ele; // Optional: return the created element
};
