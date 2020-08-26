const focusListElement = document.getElementById('focusList');

// default or dark
if (chrome.devtools.panels.themeName == "dark") 
{
    document.documentElement.setAttribute("theme", "dark");
}

function updateScroll(newEntryElement){
    newEntryElement.scrollIntoView();
}

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

    updateScroll(newEntryElement);
}

// Create a connection to the background page
var backgroundConnection = chrome.runtime.connect({
    name: "focus-x"
});

backgroundConnection.onMessage.addListener(function (message) {
    // Handle responses from the background page, if any
    addToFocusList(message);
});

backgroundConnection.postMessage(
{
    tabId: chrome.devtools.inspectedWindow.tabId,
});