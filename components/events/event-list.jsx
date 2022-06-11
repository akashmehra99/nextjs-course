import EventItem from "./event-item";
import styles from '../../styles/event-list.module.css'
function EventList({ items }) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <EventItem key={item.id} eventDetails={item} />
      ))}
    </ul>
  );
}

export default EventList;
