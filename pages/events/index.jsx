import Head from "next/head";
import EventsApi from "../../helpers/api.utils";
import EventList from "../../components/events/event-list";
import { Fragment } from "react";
import EventsSearch from "../../components/events/events-search";
import { useRouter } from "next/router";
function AllEventsPage(props) {
  const { allEvents } = props;
  const router = useRouter();
  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <Head>
        <title>All EVents</title>
        <meta name="description" content="Find a lot of great Events that allow you to evolve" />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={allEvents} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const allEvents = await EventsApi.getAllEvents();

  return {
    props: {
      allEvents,
    },
    revalidate: 30,
  };
}

export default AllEventsPage;
