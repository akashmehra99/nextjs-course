import { Fragment } from "react";

import EventsApi from "../../helpers/api.utils";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

function EventDetailPage(props) {
  const {eventDetails}  = props;
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

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const eventDetails = await EventsApi.getEventById(eventId);
  return {
    props: {
      eventDetails,
    },
    revalidate: 30
  };
}

export async function getStaticPaths() {
  const events = await EventsApi.getAllEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths,
    fallback: true
  };
}

export default EventDetailPage;
