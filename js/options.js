window.onload = function() {
  chrome.identity.getAuthToken({interactive: true}, function(token) {
      let init = {
          method: 'GET',
          async: true,
          headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json'
          },
          'contentType': 'json'
      };
      
      chrome.storage.sync.get('measureType', function(data) {
          if(data.measureType == "startStop")
          {
              document.querySelector("#startStop").selected = 'selected';
          }
          else if(data.measureType == "sumTotal")
          {
            document.querySelector("#sumTotal").selected = 'selected';
          }
        });
               

      document.querySelector("#measureTypeButton").addEventListener('click',
          () => {
              let measurmentTypeSelect = document.querySelector("#measureType");
              let mType = measurmentTypeSelect.options[measurmentTypeSelect.selectedIndex].value;
              chrome.storage.sync.set(
                  { measureType: mType }, 
                  () => console.log("Changed mType to: " + mType )
              );
              location.reload();
          });
      
  });
};
