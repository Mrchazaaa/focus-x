console.log("Running focus listening content script.");

function sendMessageToBackgroundScript() {
    chrome.runtime.sendMessage(
        {
            focusedElement: document.activeElement,
            text: "hey"
        }, 
        function(response) {
            console.log("Response: ", response);
        }
    );
}

document.addEventListener('focus', function() {
    console.log("sending new message, to background, after focus change.");
    sendMessageToBackgroundScript();
}, true);