chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set(
    {measureType: 'startStop'}, 
    function() {
      console.log("Measure type set to stop-start.");
    });
});
  
chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.create({url: 'index.html'});
});

  