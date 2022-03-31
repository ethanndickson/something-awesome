// Since this file gets run on document_end, we don't need to use any events
chrome.storage.local.get(['enabled'],function(result){
    if (result.enabled) { walk(document.body) };
});


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
// smiley mapping inspiration from https://en.wikipedia.org/wiki/List_of_emoticons
function doReplace(textNode)
{
    var val = textNode.nodeValue;
    val = val.replace(/(^|\s+)<3/g, "❤️");
    val = val.replace(/(^|\s+)<\/3/g, "💔");
    val = val.replace(/(^|\s+)[:=][=\-‑^]?[\)\}\]]/g, "😃");
    val = val.replace(/(^|\s+)[:=][=\-‑^]?[\(\{\[]/g, "😦");
    val = val.replace(/(^|\s+)[:=][=\-‑^]?D/g, "😄");
    val = val.replace(/(^|\s+)[:=][=\-‑^]?P/gi, "😛");
    val = val.replace(/(^|\s+)q?[B8][=\-‑^]?[\)\}\]D]/g, "😎");
    val = val.replace(/(^|\s+);[=\-‑^]?[\)\}\]]/g, "😉");
    val = val.replace(/(^|\s+);[=\-‑^]?P/gi, "😜");
    val = val.replace(/(^|\s+)([:=]'[\)\}\]]|[xX][-‑]?D)/g, "😂");
    val = val.replace(/(^|\s+)[:=][-‑]?[\|I]/g, "😐");
    val = val.replace(/(^|\s+)[:=]'[=\-‑^]?[\(\{\[]/g,"😭")
    val = val.replace(/(^|\s+)>?[:=][=\-‑^]?[\/\\]/g,"😕")
    val = val.replace(/(^|\s+)D[=\-‑^]?[:=]<?/g,"😫")
    val = val.replace(/(^|\s+)>?[8:=][=\-‑^]?[O0o]/g,"😮")
    val = val.replace(/(^|\s+):\$\s+/g,"😖")
    textNode.nodeValue = val;
}