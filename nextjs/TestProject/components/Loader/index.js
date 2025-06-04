import Logo from "@/public/images/talque-logo.svg";
import Image from "next/image";

const Loader = () => {
  return (
    <div className="flex items-center justify-center gap-2 h-[calc(100vh-100px)] !bg-white">
      {/* <div className="border-gray-300 h-12 w-12 animate-spin rounded-full border-4 border-t-[#227BEF]" /> */}
      <Image
        id="blinking-image"
        className="min-w-[180px] max-w-[180px]"
        src={Logo}
        alt="Talque"
        height={1000}
        width={1000}
      />
    </div>
  );
};

export default Loader;
