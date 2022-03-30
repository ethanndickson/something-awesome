/* activate smiley on install */
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ enabled: true},function() {console.log("installed, smileys enabled")});
});