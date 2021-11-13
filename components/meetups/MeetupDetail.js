import classes from "./MeetupDetail.module.css";

function MeetupDetail(porps) {
  return (
    <section className={classes.detail}>
      <img src={porps.image} alt={porps.title} />
      <h1>{porps.title}</h1>
      <address>{porps.address}</address>
      <p>{porps.description}</p>
    </section>
  );
}

export default MeetupDetail;
