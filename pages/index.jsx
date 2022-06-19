import EventList from "../components/events/event-list";
import EventsApi from "../helpers/api.utils";
function Home(props) {
  return (
    <>
      <EventList items={props.featuredEvents} />
    </>
  );
}

export async function getStaticProps() {
  const featuredEvents = await EventsApi.getFeaturedEvents();
  return {
    props: {
      featuredEvents
    },
    revalidate: 30
  }
}

export default Home;
