function sortEventsIntoDays(each, days) {
    try {
        let day = new Date(each.start.dateTime);
        if (each.summary.includes("You entered")) 
        {
            addToDates(day, days, 'S', each);
        }
        else if (each.summary.includes("You exited")) 
        {
            addToDates(day, days, 'E', each);
        }
    }
    catch (exception) { }
}

function addToDates(day, days, letter, each) {
    days[day.getDate().toString()][letter] = new Date(each.start.dateTime);
}

function getMondayDate() {
    d = new Date();
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
      
    let monday = new Date(d.setDate(diff))
    return new Date(year = monday.getFullYear(), month = monday.getMonth(), day = monday.getDate());
}


function addOptions(select, data)
{
    data.items.forEach((x)=>addOption(select, x));
}

function addOption(select, each)
{
    select.options.add( new Option(each.summary,each.id, true, true));
}

function createSummaryStartStop(init) {
    let e = document.getElementById("calSel");
    let strUser = e.options[e.selectedIndex].value;
    let eventsDiv = document.getElementById("events");
    let mondy = getMondayDate().toISOString();
    let request = 'https://www.googleapis.com/calendar/v3/calendars/' + strUser + '/events?timeMin=' + mondy;
    let events = fetch(request, init);
    events.then((response) => response.json()).then(function (data) {
        var days = {};
        for( var i = 0; i < 5; i++)
        {
            days[ (i + getMondayDate().getDate()).toString() ] = {};
        }
        data.items.forEach((x) => sortEventsIntoDays(x, days));
        addSummary(days, eventsDiv);
    });
}

function enrichWithHours(days)
{
    for(var d in days)
    {
        let startDate = new Date(days[d]['S']);
        let endDate = new Date(days[d]['E']);
        let timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
        let diffDays = Math.floor(timeDiff / (60 * 60 * 1000));
        let rest = (timeDiff % (60 * 60 * 1000)) / (60 * 1000); 
        days[d]['Hours'] = diffDays ? diffDays : 0;
        days[d]['Minutes'] = rest ? rest : 0;
    }
    return days
}
function addSummary(days, hoursDiv) {
    let totalHours = 0;
    let totalMinutes = 0;
    let x = enrichWithHours(days);
    for (var d in days) {
        let line = document.createElement('p');
        totalHours += days[d]['Hours'];
        totalMinutes += days[d]['Minutes'];
        line.innerText = d + ' ' + days[d]['Hours'] + ':' + days[d]['Minutes'];
        hoursDiv.appendChild(line);
    }
    let summaryLine = document.createElement('p');
    summaryLine.innerText = 'Total:' + ' ' + (totalHours + Math.floor(totalMinutes / 60)) + ':' + (totalMinutes % 60).toString().padStart(2,"0");
    hoursDiv.appendChild(summaryLine);
}

