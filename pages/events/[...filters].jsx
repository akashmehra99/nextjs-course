import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import { Fragment } from "react";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import EventsApi from "../../helpers/api.utils";
function FilteredEventsPage(props) {
  const { hasError, filteredEvents, date } = props;

  if (hasError) {
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
  if (!filteredEvents || filteredEvents.length === 0) {
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
  const dateFilter = new Date(date.year, (date.month - 1));
  return (
    <Fragment>
      <ResultsTitle date={dateFilter} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const filterData = params.filters;
  const [year, month] = filterData;
  if (
    isNaN(+year) ||
    isNaN(+month) ||
    +year > 2030 ||
    +year < 2021 ||
    +month < 1 ||
    +month > 12
  ) {
    return {
      props: {
        hasError: true,
      },
    };
  }

  const filteredEvents = await EventsApi.getFilteredEvents({
    year: +year,
    month: +month,
  });

  return {
    props: {
      filteredEvents,
      date: { year: +year, month: +month },
    },
  };
}

export default FilteredEventsPage;
