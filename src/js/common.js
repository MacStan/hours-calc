module.exports.getTimeDifference = getTimeDifference;
module.exports.getNextSundayDate = getNextSundayDate;
module.exports.getSundayDate = getSundayDate;
module.exports.createSummary =  createSummary;
module.exports.hoursFromMicroseconds = hoursFromMicroseconds;
module.exports.minutesFromMicroseconds = minutesFromMicroseconds
module.exports.getNextDate = getNextDate;

function getTimeDifference(startDate, endDate)
{
    return Math.abs(endDate.getTime() - startDate.getTime());
}

function getSundayDate(d, offset = 0) {
    if (typeof myVar == 'undefined')
        d = new Date();
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (offset * 7); //+ (day == 0 ? -6:1); // adjust when day is sunday
      
    let monday = new Date(d.setDate(diff))
    return new Date(monday.getFullYear(),monday.getMonth(),monday.getDate() );
}

function getNextSundayDate(d, offset = 0)
{
    if (typeof myVar == 'undefined')
        d = new Date();
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + 7 + (offset * 7);// + (day == 0 ? -6:1) + 7; // adjust when day is sunday
      
    let monday = new Date(d.setDate(diff))
    return new Date( monday.getFullYear(),monday.getMonth(),monday.getDate() );
}

function getNextDate(date, offset)
{
    var result = new Date(date);
    result.setDate(result.getDate() + offset);
    return result;
}

function createSummary(days, getTimeSpans, offset) 
{
    let totalHours = 0;
    let totalMinutes = 0;
    days = getTimeSpans(days);
    let result = [];
    for (var i = 0; i < 7; i++) 
    {
      let d = getNextDate(getSundayDate(new Date(), offset), i).getDate();
      totalHours += days[d]['hours'];
      totalMinutes += days[d]['minutes'];
      result.push( d + ' - ' + days[d]['hours'] + ':' + days[d]['minutes'].toString().padStart(2,"0") );
    }
    result.push( 'Total-' + ' ' + (totalHours + Math.floor(totalMinutes / 60)) + ':' + (totalMinutes % 60).toString().padStart(2,"0") );
    return result;
}

function hoursFromMicroseconds( ms )
{
    return Math.floor( ms / ( 60 * 60 * 1000) );
}

function minutesFromMicroseconds( ms )
{
    return ((ms % (60 * 60 * 1000)) / (60 * 1000)); 
}

function removeAllChildNodes( node )
{
    while (node.firstChild) {
        node.removeChild(node   .firstChild);
    }
}