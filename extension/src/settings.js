/* activate smiley on install */
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ smiley_enabled: true});
});

/* toggle enabled bool in storage */
document.getElementById("mainbutton").addEventListener("click", (ev) => {
    chrome.storage.sync.set({ smiley_enabled: !smiley_enabled });
  });