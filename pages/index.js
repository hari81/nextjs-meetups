import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

function Home(props) {
  return (
    <Fragment>
      <Head>
        <meta name="description" content="Used nextjs to build" />
        <title>React Meetup's page</title>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}
export async function getStaticProps() {
  //fetch data from api
  const client = await MongoClient.connect(
    "mongodb+srv://Hari:Aashika81@cluster0.xprol.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = await client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: `${meetup._id}`,
      })),
    },
    revalidate: 1,
  };
}

// export async function getServerSideProps(context) {
//   // fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }
export default Home;
