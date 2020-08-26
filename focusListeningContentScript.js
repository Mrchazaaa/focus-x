const sendMessageToBackgroundScript = () => {
    chrome.runtime.sendMessage(
        {
            focusedElement: document.activeElement.outerHTML,
            timeStamp: (new Date()).toLocaleTimeString()
        } 
    );
}

document.addEventListener('focus', function() {
    sendMessageToBackgroundScript();
}, true);

chrome.runtime.connect().onDisconnect.addListener(function() {
    sendMessageToBackgroundScript = () => {};
});