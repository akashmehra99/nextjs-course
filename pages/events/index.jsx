import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
function AllEventsPage() {
  const allEvents = getAllEvents();
  return <EventList items={allEvents} />;
}

export default AllEventsPage;
