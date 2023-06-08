document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById("toggleButton");

    // Retrieve the stored state and set the checkbox accordingly
    chrome.storage.sync.get("enabled", function(data) {
        toggleButton.checked = data.enabled || false;
    });

    toggleButton.addEventListener("change", function() {
        const enabled = toggleButton.checked;

        // Store the updated state
        chrome.storage.sync.set({ "enabled": enabled });

        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const tab = tabs[0];
            chrome.tabs.sendMessage(tab.id, { action: enabled });
        });
    });
});