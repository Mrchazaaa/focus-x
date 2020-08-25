const focusListElement = document.getElementById('focusList');

function addToFocusList(text) {
    var newLiElement = document.createElement('li');
    newLiElement.appendChild(document.createTextNode(text))
    focusListElement.appendChild(newLiElement);
}

console.log("panel is running");

// Create a connection to the background page
var backgroundConnection = chrome.runtime.connect({
    name: "focus-x"
});

backgroundConnection.onMessage.addListener(function (message) {
    // Handle responses from the background page, if any
    console.log("recived message");
    console.log(message);
    addToFocusList(message.focusedElement);
});

console.log("sending message to background guy");
backgroundConnection.postMessage(
{
    tabId: chrome.devtools.inspectedWindow.tabId,
});