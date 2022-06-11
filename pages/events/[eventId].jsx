import { useRouter } from "next/router";
import { Fragment } from "react";

import { getEventById } from "../../dummy-data.js";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

function EventDetailPage() {
  const router = useRouter();

  const eventId = router.query.eventId;
  const eventDetails = getEventById(eventId);

  if (!eventDetails) {
    return <p>No Event found!</p>;
  }
  return (
    <Fragment>
      <EventSummary title={eventDetails.title} />
      <EventLogistics
        address={eventDetails.location}
        date={eventDetails.date}
        image={eventDetails.image}
        imageAlt={eventDetails.title}
      />
      <EventContent>
        <p>{eventDetails.description}</p>
      </EventContent>
    </Fragment>
  );
}

export default EventDetailPage;
