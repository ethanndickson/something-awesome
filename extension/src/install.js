chrome.runtime.onInstalled.addListener(() => {
    /* Setup persistence */
    chrome.storage.local.set({ enabled: true},function() {console.log("installed, smileys enabled")});
});