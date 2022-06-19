import Head from "next/head";
import EventList from "../components/events/event-list";
import EventsApi from "../helpers/api.utils";
function Home(props) {
  return (
    <>
      <Head>
        <title>NextJS EVents</title>
        <meta name="description" content="Find a lot of great Events that allow you to evolve" />
      </Head>
      <EventList items={props.featuredEvents} />
    </>
  );
}

export async function getStaticProps() {
  const featuredEvents = await EventsApi.getFeaturedEvents();
  return {
    props: {
      featuredEvents,
    },
    revalidate: 30,
  };
}

export default Home;
