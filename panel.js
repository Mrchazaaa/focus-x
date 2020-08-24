const focusListElement = document.getElementById('focusList');

function addToFocusList(text) {
    var newLiElement = document.createElement('li');
    newLiElement.appendChild(document.createTextNode(text))
    focusListElement.appendChild(newLiElement);
}

document.addEventListener('focus', function() {
    addToFocusList(document.activeElement);
}, true);