chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status !== "complete") return;
    chrome.storage.sync.get("enabled", function(data) {
        if (data.enabled) {
            chrome.tabs.executeScript(tabId, { file: 'scripts/contentScript.js' }, function (result) {

            });
        }
    })

});