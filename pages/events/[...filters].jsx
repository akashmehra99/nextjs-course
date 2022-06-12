import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import { Fragment } from "react";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
function FilteredEventsPage() {
  const router = useRouter();
  const filteredData = router.query.filters;
  if (!filteredData) {
    return <p className="center">Loading....</p>;
  }
  const [year, month] = filteredData;
  if (
    isNaN(+year) ||
    isNaN(+month) ||
    +year > 2030 ||
    +year < 2021 ||
    +month < 1 ||
    +month > 12
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p className="center">Invalid Filter Data</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }
  const eventData = getFilteredEvents({ year: +year, month: +month });
  if (!eventData || eventData.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }
  const date = new Date(+year, +month - 1);
  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={eventData} />
    </Fragment>
  );
}

export default FilteredEventsPage;
