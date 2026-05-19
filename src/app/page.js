import Banner from "@/components/Banner";
import LatestRooms from "@/components/LatestRooms";
import HomeSections from "@/components/HomeSections";

export const metadata = {
  title: "StudyNook – Home",
};

export default function Home() {
  return (
    <div>
      <Banner />
      <LatestRooms />
      <HomeSections />
    </div>
  );
}
