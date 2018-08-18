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
        var mType;
        chrome.storage.sync.get('measureType', function(data) {
            if(data.measureType == "startStop")
            {
                mType = data.measureType;
            }
            else if(data.measureType == "sumTotal")
            {
                mType = data.measureType;
            }
            else{
                mType = "startStop";
            }
          });
        
          document.querySelector("#calendarButton").addEventListener('click',
            () => {
                let measurmentTypeSelect = document.querySelector("#calSel");
                let calendarId = measurmentTypeSelect.options[measurmentTypeSelect.selectedIndex].value;
                chrome.storage.sync.set(
                    { defaultCalendar: calendarId }, 
                    () => console.log("Changed defaultCalendar to: " + calendarId )
                );
                location.reload();
            });
            

        chrome.storage.sync.get('defaultCalendar', function(data) {
            var x = createCalendarDropdown(init, mType, data);
        });
        
    });
};

function createCalendarDropdown(init, mType, defaultCalendar = "none") {
    var calendarList = fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList', init);
    let select = document.querySelector("#calSel");
    calendarList
        .then((response) => response.json())
        .then((x) => addOptions(select, x, defaultCalendar))
        .then( ()=>{
    var calendarSelect = document.querySelector("#calSel");
    var calendar = calendarSelect.options[calendarSelect.selectedIndex].text;
    if(!calendar.includes("- - -"))
            {
                if(mType == "startStop")
                {
                    createSummaryStartStop(init);
                }
                else if( mType == "sumTotal")
                {
                    createSummarySumTotal(init);
                }
            }
        });
}
