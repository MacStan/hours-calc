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
                document.querySelector('#getEvents').addEventListener('click', () => createSummaryStartStop(init));
            }
            else if(data.measureType == "sumTotal")
            {
                document.querySelector('#getEvents').addEventListener('click', () => createSummarySumTotal(init));
            }
          });
        
          document.querySelector("#measureTypeButton").addEventListener('click',
            () => {
                let measurmentTypeSelect = document.querySelector("#measureType");
                let mType = measurmentTypeSelect.options[measurmentTypeSelect.selectedIndex].value;
                chrome.storage.sync.set(
                    {measureType: mType }, 
                    () => console.log("Changed mType to: " + mType )
                );
                location.reload();
            });

        createCalendarDropdown(init);
    });
};

function createCalendarDropdown(init) {
    var calendarList = fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList', init);
    let select = document.querySelector("#calSel");
    calendarList.then((response) => response.json()).then((x) => addOptions(select, x));
}

function createSummarySumTotal(init)
{

}


