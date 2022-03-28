const mainbutton = document.getElementById("mainbutton");

// get & set starting colour 
chrome.storage.local.get(['enabled'],function(result){
    if (result.enabled) { mainbutton.style.borderColor = 'lightgreen' } // green
    else { mainbutton.style.borderColor = 'red' }
});

// toggle enabled bool in storage 
mainbutton.addEventListener("click", (ev) => {
    chrome.storage.local.get(['enabled'],function(result){
        chrome.storage.local.set({ enabled: !(result.enabled) });
        if (!result.enabled) { mainbutton.style.borderColor = 'lightgreen' } // green
        else { mainbutton.style.borderColor = 'red' }
    });
});