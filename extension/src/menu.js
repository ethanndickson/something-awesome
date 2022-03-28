const mainswitch = document.getElementById("mainswitch");


// toggle enabled bool in storage 
mainswitch.addEventListener("change", (ev) => {
    // chrome.storage.local.get(['enabled'],function(result){
    //     chrome.storage.local.set({ enabled: !(result.enabled) });
    // });
    chrome.storage.local.set({enabled: this.checked });
    alert("changed");
});