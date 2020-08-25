// const focusListElement = document.getElementById('focusList');

function addToFocusList(text) {
    var newLiElement = document.createElement('li');
    newLiElement.appendChild(document.createTextNode(text))
    focusListElement.appendChild(newLiElement);
}

// chrome.devtools.inspectedWindow.eval(
//     "document.addEventListener",
//     function(result, isException) {
//         if (isException) {
//             console.log("exception");
//             console.log(isException);
//         } else {
//             console.log("not exception");
//             console.log(result);
//             result.get(('focus', function() {
//                 addToFocusList(document.activeElement);
//             }, true));
//         }
//     }
// );

console.log("panel is running");

// Create a connection to the background page
var backgroundPageConnection = chrome.runtime.connect({
    name: "focus-x"
});

backgroundPageConnection.onMessage.addListener(function (message) {
    // Handle responses from the background page, if any
    console.log(message);
});

console.log("message sent");
// Relay the tab ID to the background page
// chrome.runtime.postMessage(
//     {
//         tabId: chrome.devtools.inspectedWindow.tabId,
//         scriptToInject: "focusListeningContentScript.js",
//     }
// );

backgroundPageConnection.postMessage(
    {
        tabId: chrome.devtools.inspectedWindow.tabId,
        scriptToInject: "focusListeningContentScript.js",
    }
);