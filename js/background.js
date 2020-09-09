const maxMessageQueueLength = 50;
var connections = {};

function createConnection(port) {
    var newConnection = {
        messageQueue: [],
        flushMessages: function() {
            var request = this.messageQueue.shift();
            while(request) {
                this.port.postMessage(request);
                request = this.messageQueue.shift();
            }
        },
        postMessage: function(request) {
            if (this.messageQueue.length == maxMessageQueueLength) {
                this.messageQueue.shift();
            }

            this.messageQueue.push(request);

            if (this.port) {
                this.flushMessages();
            }
        }
    };

    if (port) {
        newConnection.port = port;
    }

    return newConnection;
}

chrome.runtime.onConnect.addListener(function (port) {

    var extensionListener = function (message, sender, sendResponse) {
        // The original connection event doesn't include the tab ID of the
        // DevTools page, so we need to send it explicitly.
        if (message.tabId) {
            if (connections[message.tabId]) {
                connections[message.tabId].port = port;
                connections[message.tabId].flushMessages();
            } else {
                connections[message.tabId] = createConnection(port);
            }
            return;
        }
    }

    // Listen to messages sent from the DevTools page
    port.onMessage.addListener(extensionListener);

    port.onDisconnect.addListener(function(port) {
        port.onMessage.removeListener(extensionListener);

        var tabs = Object.keys(connections);
        for (var i=0, len=tabs.length; i < len; i++) {
            if (connections[tabs[i]].port == port) {
                delete connections[tabs[i]].port;
                break;
            }
        }
    });
});

// Receive message from content script and relay to the devTools page for the current tab
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // Messages from content scripts should have sender.tab set
    if (sender.tab) {
        var tabId = sender.tab.id;
        if (tabId in connections) {
            connections[tabId].postMessage(request);
        } else {
            connections[tabId] = createConnection();
            connections[tabId].postMessage(request);
        }
    }
    return true;
});

chrome.tabs.onRemoved.addListener(function(tabId, removed) {
    delete connections[tabId];
});