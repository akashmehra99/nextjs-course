import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/event-item.module.css";
import Button from "../ui/button";
import DateIcon from "../../icons/date-icon";
import AddressIcon from "../../icons/address-icon";
import ArrowRightIcon from "../../icons/arrow-right-icon";
function EventItem(props) {
  const { id, title, description, location, date, image, isFeatured } =
    props.eventDetails;
  const formattedDate = new Date(date).toDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formatAddress = location && location.replace(", ", "\n");
  return (
    <li className={styles.item}>
      <Image src={`/${image}`} alt={title} width={"200px"} height={"200px"} />
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{title}</h2>
          <div className={styles.date}>
            <DateIcon />
            <time>{formattedDate}</time>
          </div>
          <div className={styles.address}>
            <AddressIcon />
            <address>{formatAddress}</address>
          </div>
        </div>
        <div className={styles.actions}>
          <Button link={`/events/${id}`}>
            <span>Explore Event</span>
            <span className={styles.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}

export default EventItem;
