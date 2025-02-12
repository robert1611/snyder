const fetch = require('node-fetch');
const ical = require('ical');

exports.handler = async function(event, context) {
    console.log("✅ Starting calendar fetch");
    const calendars = {
        property1: {
            airbnb: "https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.airbnb.com/calendar/ical/921810172737864073.ics?s=ba684da3a4b8540084a3f8c2c26db98c"),
            vrbo: "https://www.vrbo.com/icalendar/ZZZZZ.ics?nonTentative"
        },
        property2: {
            airbnb: "https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.airbnb.com/calendar/ical/1208818393474757145.ics?s=a70f91808be0a7321bd13fec93e02385"),
            vrbo: "https://www.vrbo.com/icalendar/ZZZZZ.ics?nonTentative"
        },
        property3: {
            airbnb: "https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.airbnb.com/calendar/ical/1150251409414720594.ics?s=8f63c3c0b854580b4bd0031ba91cfa91"),
            vrbo: "https://www.vrbo.com/icalendar/ZZZZZ.ics?nonTentative"
        },
        property4: {
            airbnb: "https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.airbnb.com/calendar/ical/663572402942070120.ics?s=9eb3f4f3984f2de97060e07bd7d9ee7a"),
            vrbo: "http://www.vrbo.com/icalendar/d68022943a2a4a079c4cc11b71d971f8.ics?nonTentative"
        }
    };

    try {
        let allData = {};
        for (let property in calendars) {
            try {
                const response = await fetch(calendars[property].airbnb);
                const data = await response.json();
                const icalData = data.contents;
                const events = ical.parseICS(icalData);
                
                allData[property] = {
                    airbnb: Object.values(events)
                        .filter(event => event.type === 'VEVENT')
                        .map(event => ({
                            start: event.start?.toISOString().split("T")[0] || "Unknown",
                            end: event.end?.toISOString().split("T")[0] || "Unknown",
                            summary: event.summary || "No Title"
                        }))
                };
            } catch (error) {
                console.error(`Error processing ${property}:`, error);
                allData[property] = { airbnb: [] };
            }
        }

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(allData)
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: error.message })
        };
    }
};