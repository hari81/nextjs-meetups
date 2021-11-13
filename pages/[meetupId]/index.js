import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";

function MeetupDetails(props) {
  return <MeetupDetail {...props.meetupData} />;
}
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://Hari:Aashika81@cluster0.xprol.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = await client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => {
      return {
        params: { meetupId: `${meetup._id}` },
      };
    }),
  };
}
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  console.log("meetupId", meetupId);
  // fetch data
  const client = await MongoClient.connect(
    "mongodb+srv://Hari:Aashika81@cluster0.xprol.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = await client.db();
  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();
  return {
    props: {
      meetupData: {
        image: selectedMeetup.image,
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
        id: `${selectedMeetup._id}`,
      },
    },
  };
}

export default MeetupDetails;
