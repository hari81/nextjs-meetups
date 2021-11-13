import NewMeetupForm from "../../components/meetups/NewMeetupForm";

import router, { useRouter } from "next/router";

function NewMeetupPage() {
  const rotuer = useRouter();
  async function addMeetupHandler(meetupData) {
    const resposne = await fetch("/api/new-meetups", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // const data = await resposne.json();
    // console.log(data);
    router.push("/");
  }
  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
}

export default NewMeetupPage;
