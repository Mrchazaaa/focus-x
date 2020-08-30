function addToFocusList(data, timestamp) {

    const newNode = createNode(data, timestamp);

    newNode.find("ol").hide();

    newNode.find(".collapseIcon").click(function() {
        $(this).parent().find("> ol").toggle();
        
        $(this).toggleClass("rotatedIcon");

        $(this).parent().find("> .nodeValue").find("> .ellipses").toggle();
        $(this).parent().find("> .nodeValue").find("> .closingTag").toggle();
    });

    $("#treeRoot").append(newNode);

    newNode[0].scrollIntoView();
}

// Create a connection to the background page
var backgroundConnection = chrome.runtime.connect({
    name: "focus-x"
});

// Handle responses from the background page, if any
backgroundConnection.onMessage.addListener(function (message) {
    console.log(message);
    addToFocusList(message.focusedElement, message.timestamp);
});

// Tell background script which tab we want to recieve messages from
backgroundConnection.postMessage(
{
    tabId: chrome.devtools.inspectedWindow.tabId,
});