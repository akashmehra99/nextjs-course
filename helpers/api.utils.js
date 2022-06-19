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
    const events = await this.getAllEvents();
    return events.filter((event) => event.isFeatured);
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
    let filteredEvents = [];
    try{
      const events = await this.getAllEvents();
      filteredEvents = events.filter((event) => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
        );
      });
    } catch (error) {
      console.error("Error in getting filtered events");
    }
    return filteredEvents;
  }
}

const EventsApi = new EventsAPI();
export default EventsApi;
