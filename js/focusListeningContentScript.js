function formatActiveObjectData(activeObject) {
    const innerHTML = activeObject.innerHTML;
    const outerHTML = activeObject.outerHTML;

    const splitData = outerHTML.split(innerHTML);
    const closingTag = splitData[1];
    const value = splitData[0];

    if (innerHTML && activeObject.children.length > 0) {
        return {
            value: value,
            children: [...(activeObject.children)].map(x => formatActiveObjectData(x)),
            closingTag: closingTag        
        };
    } else {
        return {
            value: outerHTML
        };
    }
}

var sendMessageToBackgroundScript = () => {
    const formattedData = formatActiveObjectData(document.activeElement);

    chrome.runtime.sendMessage(
        {
            // focusedElement: document.activeElement.outerHTML,
            // focusedElement: document.activeElement,
            focusedElement: formattedData,
            timestamp: (new Date()).toLocaleTimeString()
        } 
    );
}

chrome.runtime.connect().onDisconnect.addListener(function() {
    sendMessageToBackgroundScript = () => {};
});

document.addEventListener('focus', function() {
    sendMessageToBackgroundScript();
}, true);