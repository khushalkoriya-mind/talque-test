import {
  filterHandler,
  renderLogo,
  classes,
  LazyLoadImage,
} from "@/utils/helper";

const Section4 = ({ trustPartnerLogos, data }) => {
  return (
    <div className="bg-off-white homepage_trust_partner_bg flex flex-col justify-center items-center pt-10 pb-20">
      <div
        className={`text-talque-primary-color ${"xl:text-5xl lg:text-4xl md:text-3xl text-2xl xl:!leading-66 lg:!leading-10 md:!leading-9 !leading-8 font-semibold"} capitalize lg:mb-16 mb-10`}>
        {data?.title_customers}
      </div>
      {trustPartnerLogos?.length > 0 && (
        <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-10">
          {[...Array(3)].map((_, repetitionIndex) =>
            filterHandler(trustPartnerLogos)?.map((item, index) => (
              <div key={index} className="col-span-1">
                {item?.attributes?.image?.data?.attributes?.url ? (
                  <LazyLoadImage
                    className="w-[128px] h-[55px]"
                    src={item?.attributes?.image?.data?.attributes?.url}
                    altText={`Trust Partner Logo`}
                  />
                ) : (
                  renderLogo("w-[128px] h-[55px]")
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Section4;
