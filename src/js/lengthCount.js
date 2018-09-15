function getSummaryDataSumTotal(data,day, offset)
{
    var days = {};
    for( var i = 0; i < 7; i++ )
    {
        days[ (getNextDate( day, i ).getDate() ).toString() ] = [];
    }
    data.items.forEach((x) => addLengths(x, days));
    return createSummary(days, sumHours, offset);
}

function addLengths(each, days)
{
    if( each.status != "cancelled" ){
        var offset = new Date(each.start.dateTime).getDate().toString();
        if(typeof days[offset] !== 'undefined')
        {
            days[offset].push(getTimeDifference(new Date(each.start.dateTime), new Date(each.end.dateTime))) ;
        }
    }
}

function sumHours(days)
{
    summerHours = [];
    for(var day in days)
    {
        let dayHours = 0;
        for(let hour in days[day])
        {
            dayHours += days[day][hour];
        }

        let hours = hoursFromMicroseconds(dayHours);
        let minutes = minutesFromMicroseconds(dayHours);

        summerHours[day] = {
            "minutes" : minutes,
            "hours" : hours
        } ;
    }
    return summerHours;
}