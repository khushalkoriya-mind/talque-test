import { classes } from "@/utils/helper";
import Carousel from "./Carousel";

const GetToKnowTheTeam = ({ data, teamData }) => {
  return (
    <section className="min-h-auto bg-white">
      <div className="pt-20 pb-2 lg:pb-0 md:pb-0 2xl:gap-y-14 xl:gap-y-10 lg:gap-y-5 md:gap-y-1 flex flex-col">
        <div className="flex flex-col 2xl:gap-10 xl:gap-10 lg:gap-4 gap-2 lg:text-center lg:items-center lg:px-0 px-5">
          <div className="xl:text-5xl lg:text-3xl md:text-3xl text-2xl font-semibold capitalize">
            {data?.get_to_know_team_title}
          </div>
          <div
            className={`${"lg:!leading-8 md:!leading-7 !leading-6 lg:text-xl text-lg text-base"} font-normal text-talque-secondary-color 2xl:w-1/2 xl:w-2/5 lg:w-[70%] md:w-[85%]`}>
            {data?.get_to_know_team_description}
          </div>
        </div>
        <div>
          <Carousel teamData={teamData} />
        </div>
      </div>
    </section>
  );
};

export default GetToKnowTheTeam;
