function getSummaryDataStartStop(data, day) 
{
    var days = {};
    for( var i = 0; i < 7; i++)
    {
        days[ (i + day.getDate()).toString() ] = {};
    }
    data.items.forEach((x) => sortEventsIntoDays(x, days));
    return createSummary(days, enrichWithHours);
}

function sortEventsIntoDays(each, days) 
{
    try 
    {
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

function addToDates(day, days, letter, each) 
{
    days[day.getDate().toString()][letter] = new Date(each.start.dateTime);
}


function enrichWithHours(days)
{
    for(var d in days)
    {
        let startDate = new Date(days[d]['S']);
        let endDate = new Date(days[d]['E']);

        let timeDiff = getTimeDifference(startDate, endDate);
        
        let hours = hoursFromMicroseconds(timeDiff);
        let minutes = minutesFromMicroseconds(timeDiff);
        days[d]['hours'] = hours ? hours : 0;
        days[d]['minutes'] = minutes ? minutes : 0;
    }
    return days
}








