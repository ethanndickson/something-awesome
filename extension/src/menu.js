/* toggle enabled bool in storage */
document.getElementById("mainbutton").addEventListener("click", (ev) => {
    chrome.storage.local.get(['enabled'],function(result){
        chrome.storage.local.set({ enabled: !(result.enabled) });
    });
});