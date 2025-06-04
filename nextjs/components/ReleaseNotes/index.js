import Section1 from "@/components/ReleaseNotes/Section1/Section1";
import ReleaseNoteList from "@/components/ReleaseNotes/ReleaseNoteList/ReleaseNoteList";
import GetLatestUpdate from "@/components/GetLatestUpdate";
import ContactOurDepartment from "@/components/ContactOurDepartment";
import ReleaseNoteListUI from "@/components/ReleaseNotes/ReleaseNoteList/ReleaseNoteListUI";
import { useRouter } from "next/router";

const ReleaseNotes = ({ data }) => {
  const router = useRouter();
  return (
    <>
      {router?.pathname === "/release-notes" && <Section1 data={data} />}
      {router?.pathname === "/release-notes" ? (
        <ReleaseNoteList />
      ) : (
        <ReleaseNoteListUI data={data} />
      )}
      <GetLatestUpdate title={"Don’t miss anything with our newsletter!"} />
      <ContactOurDepartment />
    </>
  );
};

export default ReleaseNotes;
