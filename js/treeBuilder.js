function createParentNode(nodeValue, children) {
    const collapseIcon = $("<img></img>").attr('src','../images/collapseTriangle.svg').addClass("collapseIcon");
    const childContainer = $("<ol class='childNodeList'></ol>").append(children.map(x => createNode(x)));

    return [collapseIcon, nodeValue, childContainer];
}



function createNode(nodeContent, timestamp) {    
    const treeNode = $("<div></div>").addClass("treeNode");

    const nodeValue = $("<div></div>").addClass("nodeValue");
    const contentElement = $("<code></code>").addClass(['language-html', 'codeSnippet']).text(nodeContent.value);
    Prism.highlightElement(contentElement[0]);
    const ellipsesElement = $("<span></span>").addClass('ellipses').text('...').css("color", "white");
    const closingTagElement = $("<code></code>").addClass(['language-html', 'codeSnippet', 'closingTag']).text(nodeContent.closingTag);
    Prism.highlightElement(closingTagElement[0]);

    if (timestamp) {
        treeNode.append($("<span></span>").text(timestamp).addClass("timestamp"));
    }

    if (nodeContent.children) {
        nodeValue.append([contentElement, ellipsesElement, closingTagElement]);

        treeNode.append(createParentNode(nodeValue, nodeContent.children));
    } else {
        nodeValue.append([contentElement, closingTagElement]);

        treeNode.append(nodeValue.addClass("leafNode"));
    }


    treeNode.find("> .childNodeList").append(closingTagElement.clone());
    
    return treeNode;
}
