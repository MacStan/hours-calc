window.onload = function() {
    chrome.identity.getAuthToken({interactive: true}, function(token) {
        chrome.cookies.set({ url:"https://www.googleapis.com/calendar/", name:"token", value:token},
        (x)=>{console.log(x);});

        chrome.storage.sync.get(['measureType', 'weekOffset', 'defaultCalendar'], function(storage) {
            createCalendarDropdown(getRequest(token), storage);
            createCalendarTable(storage.defaultCalendar, storage.weekOffset);
        });
    });
};

function getRequest( token )
{
    return {
        method: 'GET',
        async: true,
        headers: {
            Authorization: 'Bearer ' + token, 
            'Content-Type': 'application/json'
        },
        'contentType': 'json'
    };
}

function createCalendarDropdown(init, storage) 
{
    chrome.cookies.get({ url:"https://www.googleapis.com/calendar/", name:"token"},
    (token)=>{ 
        var calendarList = fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList', getRequest(token.value));
        calendarList.then( (response) => response.json() )
            .then( (x) => ReactDOM.render( <Calendars init={getRequest(token.value)} storage={storage} calendars={x.items} />, document.getElementById("calendarSelectHolder")));
    });
}

function createCalendarTable(calendarId, offset) 
{   
    chrome.cookies.get({ url:"https://www.googleapis.com/calendar/", name:"token"},
    (token)=>{ 
        if( calendarId != "none") {
            ReactDOM.render(<Summary token={token.value} calendarId={calendarId} offset={offset}/>, document.getElementById("hoursSummary"));
        }
        else{
            ReactDOM.render(<NoDefaultCalendar/>,document.getElementById("hoursSummary"));
        }
    });
}

class NoDefaultCalendar extends React.Component
{
    render()
    {  
        return (<div className="col-12">
        <div className="alert alert-info text-center col-12">No default calendar found. Please choose one from dropdown on the top.</div>
        </div>);
    }
}

class NoEventsMessage extends React.Component
{
    render()
    {
        return (<div className="alert alert-warning text-center col-12">No events found in calendar for choosen week.</div>);
    }
}

class Summary extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {};
        this.state.calendarId = props.calendarId;
        this.state.offset = props.offset;
        this.state.token = props.token;
        this.state.data = [];
        this.getEventsPromise = this.getEventsPromise.bind(this);
        this.updateData = this.updateData.bind(this);
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
        this.updateData(props.calendarId, props.offset);
        this.state.isInitialized = false;
    }

    getEventsPromise(init, calendarId, offset)
    {
        let timeMin = getSundayDate(new Date(), offset).toISOString();
        let timeMax = getNextSundayDate(new Date(), offset).toISOString();
        let request = 'https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events?timeMin=' + timeMin + "&timeMax=" + timeMax + "&singleEvents=true";
        return fetch(request, init).then((response) => response.json());
    }
    
    componentWillReceiveProps(nextProps)
    {
        if( nextProps.calendarId != this.state.calendarId
            || nextProps.offset != this.state.offset)
        {
            this.updateData(nextProps.calendarId, nextProps.offset )
        }
    }

    daysHeader(props)
    {
        let headers = [];
        for (var r in props) 
        {
            headers.push((<th> {props[r].split("-")[0]} </th>))
        }
        return headers;
    }
    hoursHeader(props)
    {
        let headers = [];
        for (var r in props) 
        {
            headers.push((<td> {props[r].split("-")[1]} </td>))
        }
        return headers;
    }
    table(props)
    {
        return (
            <div className="col-12">
                <table className="table">
                    <thead id="hoursRow" className="">
                        {this.daysHeader(props)}
                    </thead>
                    <tbody id="events" className="">
                        <tr id="hoursRow">
                            {this.hoursHeader(props)}
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
    updateData(calendarId, offset)
    {
        
        this.getEventsPromise(getRequest(this.state.token), calendarId, offset)
            .then((data)=> {
                let summaryData = [];
                if(data.items.length != 0)
                {
                    summaryData = getSummaryDataSumTotal(data, getSundayDate(new Date(), offset),offset)
                }
                
                this.setState(
                {
                    calendarId : calendarId,
                    offset : offset,
                    token : this.state.token,
                    data : summaryData,
                });
          });
        
    }
    prev(){
        var newValue = this.state.offset - 1;
        chrome.storage.sync.set({ 'weekOffset': newValue }, () => console.log("Offset changed to: " + (newValue) ));
        let newState = this.state;
        newState.offset = newValue;
        this.updateData(newState.calendarId, newState.offset);
    }
    next(){
        var newValue = this.state.offset + 1;
        chrome.storage.sync.set({ 'weekOffset': newValue }, () => console.log("Offset changed to: " + (newValue) ));
        let newState = this.state;
        newState.offset = newValue;
        this.updateData(newState.calendarId, newState.offset);
    }
    render()
    {
        var jsx;   
        if(this.state.data.length != 0)
        {
            jsx = this.table(this.state.data);
        }
        else
        {
            if(this.state.isInitialized == false)
            {
                this.state.isInitialized = true;
            }
            else{
            jsx =(<div className="col-12">
                    <NoEventsMessage />
                </div>);
                }
        }

        return(

            <div>
                <div className="row">
                    <div className="col-12">
                        <p id="weekParagraph" className="text-center lead">{moment(getSundayDate(new Date(), this.state.offset)).format("YYYY/MM/DD") + " -> "
                            + moment(getNextSundayDate(new Date(), this.state.offset)).format("YYYY/MM/DD")}</p>
                    </div>
                </div>

                <div className="row" style={{height: '100px'}}>
                    {jsx}
                </div>
                <div id="weekSelectionButtons" className="row">
                    <div className="col-6">
                        <button className="btn btn-block btn-secondary btn-sm" id="prevButton" onClick={this.prev}>Prev</button>
                    </div>
                    <div className="col-6">
                        <button className="btn btn-block btn-secondary btn-sm" id="nextButton" onClick={this.next}>Next</button>
                    </div>
                </div>
            </div>
        );
    
    }
}

class Calendars extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {}
        this.state["init"] = props.init;
        this.state["calendars"] = props.calendars;
        this.state["storage"] = props.storage;
        this.handleChange = this.handleChange.bind(this);
        this.handleButton = this.handleButton.bind(this);
    }

    handleChange()
    {
        let selectedCalendar = document.querySelector("#calendarSelect");
        let calendarId = selectedCalendar.options[selectedCalendar.selectedIndex].value;
        createCalendarTable(calendarId, this.state.storage.weekOffset);
    }

    handleButton()
    {
        let measurmentTypeSelect = document.querySelector("#calendarSelect");
        let calendarId = measurmentTypeSelect.options[measurmentTypeSelect.selectedIndex].value;
        chrome.storage.sync.set(
            { defaultCalendar: calendarId }, 
            () => console.log("Changed defaultCalendar to: " + calendarId )
        );
        this.handleChange()
    }
    render()
    {
        let jsx = [];
        this.state.calendars.forEach(calendar => {
            jsx.push( (<option value={calendar.id} > {calendar.summary} </option>) );
        });
        return (
            <div className="row">
                <div id="calSel" className="col-8">
                    <select id="calendarSelect" onChange={this.handleChange} defaultValue={this.state.storage.defaultCalendar} className="form-control form-control-sm">
                        {jsx}
                    </select>
                </div>
                <div className="col-4">
                    <button className="btn btn-block btn-secondary btn-sm" onClick={this.handleButton}>Save as default</button>
                </div>
            </div>);
    }
}
