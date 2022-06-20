class EventsAPI {
  constructor() {
    this.api_server_path = "http://localhost:3030";
    this.events_api = `${this.api_server_path}/events`;
  }

  async getAllEvents() {
    try {
      const response = await fetch(this.events_api);
      return await response.json();
    } catch (error) {
      console.error("Error in fetching all events -> ", error);
      return [];
    }
  }

  async getFeaturedEvents() {
    const response = await fetch(`${this.events_api}/?isFeatured=true`);
    const featuredEvents = await response.json();
    return featuredEvents;
  }

  async getEventById(eventId) {
    const evevntApiUrl = `${this.events_api}/${eventId}`;
    try {
      const response = await fetch(evevntApiUrl);
      return await response.json();
    } catch (error) {
      console.error("Error in fetching Details of event id ->", eventId);
    }
  }

  async getFilteredEvents(dateFilter) {
    const { year, month } = dateFilter;
    try{
      const response = await fetch(`${this.events_api}/?month=${month}&&year=${year}`);
      const filteredEvents = await response.json();
      return filteredEvents;
    } catch (error) {
      console.error("Error in getting filtered events");
    }
  }
}

const EventsApi = new EventsAPI();
export default EventsApi;
