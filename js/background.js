chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set(
    {measureType: 'sumTotal'}, 
    function() {
      console.log("Measure type set to stop-start.");
    });
    chrome.storage.sync.set(
      {defaultCalendar: 'none'}, 
      function() {
        console.log("Default Calendar set to none");
      });
    chrome.storage.sync.set(
      {weekOffset: 0}, 
      function() {
        console.log("Set week offset to 0");
      });
});
  
chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.create({url: 'index.html'});
});