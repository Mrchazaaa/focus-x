const focusListElement = document.getElementById('focusList');

function addToFocusList(text) {
    var newLiElement = document.createElement('li');
    newLiElement.appendChild(document.createTextNode(text))
    focusListElement.appendChild(newLiElement);
}

// Create a connection to the background page
var backgroundPageConnection = chrome.runtime.connect({
    name: "devtools-page"
});

backgroundPageConnection.onMessage.addListener(function (message) {
    // Handle responses from the background page, if any
    addToFocusList(message);
});

// Relay the tab ID to the background page
chrome.runtime.sendMessage({
    tabId: chrome.devtools.inspectedWindow.tabId,
    scriptToInject: "focusListeningContentScript.js"
});