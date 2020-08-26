const focusListElement = document.getElementById('focusList');

function addToFocusList(newEntry) {
    var newEntryElement = document.createElement('div');

    var newFocusedObjElement = document.createElement('div')
    newFocusedObjElement.innerText = newEntry.focusedElement;
    newFocusedObjElement.className = "focusedObj";

    var newTimeStampElement = document.createElement('div');
    newTimeStampElement.innerText = newEntry.timeStamp;
    newTimeStampElement.className = "timestamp";

    newEntryElement.appendChild(newTimeStampElement);
    newEntryElement.appendChild(newFocusedObjElement);

    focusListElement.appendChild(newEntryElement);
}

addToFocusList({
    focusedElement: "hey im an active object",
    timeStamp: "timestamp 1"
});

addToFocusList({
    focusedElement: "me too",
    timeStamp: "timestamp 2"
});

addToFocusList({
    focusedElement: "AAAAAAAAAAAAAAAAAAAAAAaaaaaaaaaaaaaaaaaaaaa",
    timeStamp: "timestamp 3"
});

console.log("panel is running");

// Create a connection to the background page
var backgroundConnection = chrome.runtime.connect({
    name: "focus-x"
});

backgroundConnection.onMessage.addListener(function (message) {
    // Handle responses from the background page, if any
    console.log("recived message");
    console.log(message);
    addToFocusList(message);
});

console.log("sending message to background guy");
backgroundConnection.postMessage(
{
    tabId: chrome.devtools.inspectedWindow.tabId,
});