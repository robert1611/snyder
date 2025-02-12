import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import ical from "ical";
import { Buffer } from "buffer";

console.log("Starting proxy server...");

const app = express();
app.use(cors());

// Define iCal URLs for 4 properties
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

// Cache settings (30-minute cache)
const CACHE_DURATION = 30 * 60 * 1000;
let calendarCache = {};
let lastFetchTime = {};

// Fetch calendar data with retry logic
async function fetchCalendar(url, provider, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            console.log(`🔍 Fetching: ${url} (Attempt ${i + 1})`);
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "User-Agent": "Mozilla/5.0",
                    "Referer": provider === "vrbo" ? "https://www.vrbo.com/" : "https://www.google.com/",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            });

            console.log(`🔍 ${provider} Response Status: ${response.status}`);

            if (!response.ok) {
                throw new Error(`${provider} HTTP Error ${response.status}`);
            }

            const contentType = response.headers.get("content-type") || "";
            if (contentType.includes("application/json")) {
                const data = await response.json();
                return data.contents ? Buffer.from(data.contents.split(",")[1], "base64").toString("utf-8") : "";
            } else {
                return await response.text();
            }
        } catch (error) {
            console.error(`❌ ${provider} Fetch Error (Attempt ${i + 1}):`, error.message);
            if (i === retries - 1) return ""; // Return empty data after max retries
        }
    }
}

// Get cached calendar data
async function getCachedCalendar(url, provider, property) {
    const now = Date.now();
    if (calendarCache[property]?.[provider] && now - lastFetchTime[property]?.[provider] < CACHE_DURATION) {
        console.log(`⚡ Using cached ${provider} calendar for ${property}`);
        return calendarCache[property][provider];
    }

    const data = await fetchCalendar(url, provider);
    if (!calendarCache[property]) calendarCache[property] = {};
    calendarCache[property][provider] = data;
    if (!lastFetchTime[property]) lastFetchTime[property] = {};
    lastFetchTime[property][provider] = now;

    return data;
}

// API Route: Fetch all property calendars
app.get("/fetch-calendar/all", async (req, res) => {
    console.log("✅ Received request for all property calendars");

    let allData = {};

    for (let property in calendars) {
        console.log(`🔍 Fetching data for ${property}`);

        try {
            const airbnbData = await getCachedCalendar(calendars[property].airbnb, "airbnb", property);
            const vrboData = await getCachedCalendar(calendars[property].vrbo, "vrbo", property);

            console.log(`✅ Airbnb Data for ${property}:`, airbnbData ? "Received" : "❌ No Data");
            console.log(`✅ VRBO Data for ${property}:`, vrboData ? "Received" : "❌ No Data");

            const airbnbEvents = airbnbData ? ical.parseICS(airbnbData) : {};
            const vrboEvents = vrboData ? ical.parseICS(vrboData) : {};

            allData[property] = {
                airbnb: Object.values(airbnbEvents).map(event => ({
                    start: event.start?.toISOString().split("T")[0] || "Unknown",
                    end: event.end?.toISOString().split("T")[0] || "Unknown",
                    summary: event.summary || "No Title",
                    reservation_url: event.description ? event.description.split("Reservation URL: ")[1]?.split("\n")[0] : null
                })),
                vrbo: Object.values(vrboEvents).map(event => ({
                    start: event.start?.toISOString().split("T")[0] || "Unknown",
                    end: event.end?.toISOString().split("T")[0] || "Unknown",
                    summary: event.summary || "No Title"
                }))
            };
        } catch (error) {
            console.error(`❌ Error fetching data for ${property}:`, error.message);
        }
    }

    res.json(allData);
});

// Simple Route to Confirm Server is Running
app.get("/", (req, res) => {
    res.send(`
        <html>
            <head><title>Server Running</title></head>
            <body>
                <h1>✅ Proxy Server is Running</h1>
                <p>Try the following API routes:</p>
                <ul>
                    <li><a href="/fetch-calendar/all">Fetch All Calendar Data</a></li>
                </ul>
            </body>
        </html>
    `);
});

// ✅ **Fix: Bind to Railway’s Port**
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Proxy server running on port ${PORT}`);
}).on("error", (err) => {
    console.error("❌ SERVER ERROR:", err);
});