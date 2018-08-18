chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set(
    {measureType: 'startStop'}, 
    function() {
      console.log("Measure type set to stop-start.");
    });
    chrome.storage.sync.set(
      {defaultCalendar: 'none'}, 
      function() {
        console.log("Default Calendar set to none");
      });
});
  
chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.create({url: 'index.html'});
});

  