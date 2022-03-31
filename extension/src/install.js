chrome.runtime.onInstalled.addListener(() => {
    /* Setup persistence */
    chrome.storage.local.set({ enabled: true});
    fetch('http://127.0.0.1:3000/create').then(res => res.json()).then((data) => {  chrome.storage.local.set({ id: data.id }) });
});