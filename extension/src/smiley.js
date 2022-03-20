// Since this file gets run on document_end, we don't need to use any events
walk(document.body);
// This function traverses the nodes of the DOM and calls doReplace() accordingly
// Logic borrowed from https://stackoverflow.com/questions/5904914/javascript-regex-to-replace-text-not-in-html-attributes/5904945#5904945
function walk(node)
{
    var child, next;
    var tagName = node.tagName ? node.tagName.toLowerCase() : ""; // if no tagname replace with empty string
    if (tagName == 'input' || tagName == 'textarea') { return; } // ignore input boxes
    switch (node.nodeType)
    {
        case 1: // Element, Document or DocumentFragment may all contain a child
        case 9:
        case 11: 
            child = node.firstChild;
            while ( child ) // traverse siblings
            {
                next = child.nextSibling;
                walk(child);
                child = next;
            }
            break;
        case 3: // Text - we can perform a replace on this
            doReplace(node);
            break;
    }
}

// all regex written by me, plenty more to add if I wanted to
// translation assistance from https://en.wikipedia.org/wiki/List_of_emoticons
function doReplace(textNode)
{
    var val = textNode.nodeValue;

    val = val.replace(/<3/g, "❤️");
    val = val.replace(/<\/3/g, "💔");
    // happy mouths [\)\}\]
    // sad mouths [\(\{\[]
    val = val.replace(/[:=][=\-^]?[\)\}\]]/g, "😃");
    val = val.replace(/[:=][=\-^]?[\(\{\[]/g, "😦");
    val = val.replace(/[:=][=\-^]?D/g, "😄");
    val = val.replace(/[:=][=\-^]?P/gi, "😛");
    val = val.replace(/q?B[=\-^]?[\)\}\]D]/g, "😎");
    val = val.replace(/;[=\-^]?[\)\}\]]/g, "😉");
    val = val.replace(/;[=\-^]?P/gi, "😜");
    val = val.replace(/([:=]'\)|[xX]D)/g, "😂");
    val = val.replace(/[:=][\|I]/g, "😐");


    textNode.nodeValue = val;
}