import { Fragment, useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Listbox, Transition } from "@headlessui/react";
import { LanguageContext } from "@/context/LanguageContext";
import { Api } from "@/api";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import EarthIcon from "@/public/images/language-earth-icon.svg";
import { LANGUAGE_DATA } from "@/utils/constant";
import {
  LazyLoadImage,
  filterHandler,
  getButtonClass,
  renderLogo,
  setLocalStorageItem,
} from "@/utils/helper";

const Header = () => {
  const router = useRouter();
  const { languageData, setLanguageData } = useContext(LanguageContext);
  const [open, setOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);
  const [navigationsData, setNavigationsData] = useState([]);

  useEffect(() => {
    getNavigationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageData?.shortText]);

  const getNavigationData = async () => {
    const response = await Api.getNavigationList(
      languageData?.shortText || "en"
    );

    console.log("response: ", response);
    if (response?.status === 200) {
      setNavigationsData(response?.data?.data?.attributes);
    } else {
      setNavigationsData([]);
    }
  };

  const handleLanguage = (data) => {
    setLocalStorageItem("language", data);
    setLanguageData(data);
  };

  const renderLinks = (item, index) => {
    return (
      <Listbox key={index}>
        {({ open }) => (
          <div className="capitalize">
            <Listbox.Button className="group flex items-center gap-1 whitespace-nowrap">
              <div
                className={`font-normal xl:text-base text-sm lg:text-sm group-hover:text-talque-blue-color 
                ${open && "text-talque-blue-color"}
                `}
              >
                {item?.label || ""}
              </div>
              {item?.__component === "global.dropdown" && (
                <ChevronDownIcon
                  className={`group-hover:stroke-[#227BEF] min-w-[1rem] min-h-[1rem] h-4 w-4 ml-1 transform ease-out duration-200 ${
                    open
                      ? "stroke-[#227BEF] rotate-180 transition"
                      : "rotate-0 transition mt-1"
                  }`}
                />
              )}
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options>
                <div>
                  <Listbox.Option>
                    {item?.__component === "global.dropdown" && (
                      <div
                        className={`!bg-white rounded-lg opacity-100 ${
                          open
                            ? "translate-y-0 transition ease-out duration-200 absolute 2xl:left-[24%] xl:left-[20%] lg:left-[3%] -ml:[50px] z-40 mt-8 transform px-2 sm:px-0 bg-white"
                            : "translate-y-1 hidden"
                        }`}
                      >
                        <div className="rounded-md shadow-lg">
                          <div className="flex items-start pb-[20px] pt-[40px] px-[40px] w-max xl:gap-36 lg:gap-20">
                            <div className="relative grid gap-6 bg-white px-5 w-1/2">
                              <div className="flex xl:gap-24 lg:gap-14">
                                {filterHandler(item?.header_links?.data)?.map(
                                  (inner, ind) => (
                                    <div key={ind}>
                                      <div
                                        className={`mb-[20px] text-xl font-normal whitespace-nowrap ${
                                          inner?.attributes?.label === "N/A"
                                            ? "!hidden"
                                            : ""
                                        } `}
                                      >
                                        {inner?.attributes?.label || ""}
                                      </div>

                                      {inner?.attributes?.ChildLinks?.filter(
                                        (i) => !i?.is_optional
                                      )?.map((innerItem, innerIndex) => (
                                        <Link
                                          key={innerIndex}
                                          href={innerItem?.url || "/"}
                                          target={innerItem?.target || "_blank"}
                                          className={`flex items-start rounded-lg ${
                                            innerIndex === 0
                                              ? "!mt-0"
                                              : "mt-[20px]"
                                          } last:mb-0 mb-[20px]`}
                                        >
                                          <p className="text-base font-normal text-black hover:text-talque-blue-color whitespace-nowrap">
                                            {innerItem?.label || ""}
                                          </p>
                                        </Link>
                                      ))}
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                            {item?.media_image?.data?.id && (
                              <div className="w-max bg-white shadow-md rounded-lg">
                                {item?.media_image?.data?.attributes?.url ? (
                                  <LazyLoadImage
                                    className="rounded-t-md w-[300px] h-[164px] min-w-[300px] object-cover"
                                    src={
                                      item?.media_image?.data?.attributes?.url
                                    }
                                    altText="Navigation Link"
                                  />
                                ) : (
                                  renderLogo(
                                    "rounded-t-md w-[300px] h-[164px] min-w-[300px] object-cover"
                                  )
                                )}
                                <div className="text-sm p-[16px] w-[300px] break-words">
                                  {item?.media_description || ""}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </Listbox.Option>
                </div>
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    );
  };

  const renderLanguages = () => {
    return (
      <Listbox>
        {({ open }) => (
          <div className="relative">
            <Listbox.Button className="flex items-center gap-1 border-2 border-[#D17FE7] rounded-md p-1">
              <Image
                className="2xl:w-6 xl:w-6 lg:w-5 w-6"
                src={EarthIcon}
                alt="Talque"
                height={1000}
                width={1000}
              />
              <div className="uppercase text-sm">{languageData?.shortText}</div>
              <ChevronDownIcon
                className={`group-hover:stroke-[#227BEF] min-w-[1rem] min-h-[1rem] h-4 w-4 ml-1 transform ease-out duration-200 ${
                  open ? "rotate-180 transition" : "rotate-0 transition"
                }`}
              />
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="rounded-md shadow-lg text-left z-30 mt-1 max-h-60 bg-white text-sm ring-1 ring-black ring-opacity-5 absolute">
                {LANGUAGE_DATA.map((menu, index) => (
                  <div
                    className={`${
                      LANGUAGE_DATA?.length - 1 === index
                        ? "rounded-b-md"
                        : index === 0
                        ? "rounded-t-md"
                        : ""
                    } text-primary_bg hover:text-white hover:bg-[#D17FE7] cursor-pointer ${
                      languageData?.id === menu?.id ||
                      (!languageData?.id && menu?.id === 1)
                        ? "bg-[#D17FE7] text-white"
                        : ""
                    }`}
                    key={index}
                    onClick={() => handleLanguage(menu)}
                  >
                    <Listbox.Option
                      className="py-2 px-3"
                      disabled={!menu?.label}
                      value={menu}
                    >
                      <div className="flex justify-start items-center gap-1">
                        <div className="font-normal">{menu?.label}</div>
                        <div className="uppercase">({menu?.shortText})</div>
                      </div>
                    </Listbox.Option>
                    {LANGUAGE_DATA?.length - 1 !== index && (
                      <div className="border-b"></div>
                    )}
                  </div>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    );
  };

  const renderRightButtons = () => {
    return (
      <div className="flex items-center gap-4 lg:gap-2">
        {filterHandler(navigationsData?.rightside_button)?.map(
          (item, index) => (
            <div key={index}>
              <Link
                href={item?.url || "/"}
                target={item?.target || "_blank"}
                className={`transition-all duration-300 hover:scale-105 border whitespace-nowrap 2xl:px-[20px] xl:px-[20px] lg:px-3 2xl:py-3 xl:py-3 lg:py-2.5 py-3 shadow-sm xl:text-base text-sm font-normal rounded-full ${
                  item?.type === "Colored"
                    ? "hover:border-transparent bg-transparent hover:bg-dark-blue hover:text-white"
                    : "border-transparent bg-dark-blue hover:bg-blue-600 text-white"
                }`}
              >
                {item?.label}
              </Link>
            </div>
          )
        )}
      </div>
    );
  };

  const renderMobileMenu = () => {
    return (
      <div
        className={
          open
            ? "opacity-100 scale-100 transition ease-out duration-200 absolute top-0 inset-x-0 transform origin-top-right xl:hidden lg:hidden z-40"
            : "opacity-0 scale-95 absolute top-0 inset-x-0 transition transform origin-top-right xl:hidden lg:hidden"
        }
      >
        <div className="ring-1 ring-black ring-opacity-5 bg-red divide-y-2 divide-gray-50 bg-white">
          <div className="py-2">
            <div className="flex items-center justify-between px-[20px] border-b">
              <div>
                {navigationsData?.leftside_image?.data?.attributes?.url && (
                  <LazyLoadImage
                    className="w-[100px] object-cover"
                    src={navigationsData?.leftside_image?.data?.attributes?.url}
                    altText="Talque"
                  />
                )}
              </div>
              <div className="flex items-center gap-x-2">
                {renderLanguages()}
                <button
                  type="button"
                  className="bg-white rounded-md p-2 inline-flex items-center justify-center text-black focus:outline-none"
                  onClick={() => setOpen(!open)}
                >
                  <span className="sr-only">Close menu</span>

                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="mt-6 px-[20px] max-h-[calc(100vh-80px)] overflow-auto">
              {navigationsData?.header_links?.length > 0 && (
                <nav className="grid gap-y-7">
                  {filterHandler(navigationsData?.header_links)?.map(
                    (item, index) => (
                      <div className="relative" key={index}>
                        <button
                          type="button"
                          className="group bg-white rounded-md text-black items-center xl:text-base text-sm focus:outline-none w-full flex justify-between"
                          onClick={() => {
                            const value =
                              selectedLink == item?.id ? null : item?.id;
                            setSelectedLink(value);
                          }}
                        >
                          <div
                            className={`font-medium text-lg group-hover:text-talque-blue-color`}
                          >
                            {item?.label || ""}
                          </div>
                          {item?.__component === "global.dropdown" && (
                            <ChevronDownIcon
                              className={`group-hover:stroke-[#227BEF] ${
                                selectedLink === item?.id
                                  ? "stroke-[#227BEF] transform rotate-180 h-[20px] w-[20px] min-h-[1rem] min-w-[1rem] ml-1 text-black group-hover:text-black transition ease-out duration-200"
                                  : "transform rotate-0 transition ease-out duration-200 h-[20px] w-[20px] min-h-[1rem] min-w-[1rem] ml-1 text-black group-hover:text-black mt-1"
                              }
                      `}
                            />
                          )}
                        </button>

                        {item?.__component === "global.dropdown" &&
                          selectedLink === item?.id && (
                            <>
                              {filterHandler(item?.header_links?.data)?.map(
                                (inner, ind) => (
                                  <div
                                    className="transform transition ease-out duration-200"
                                    key={ind}
                                  >
                                    <div
                                      className={`mt-1 text-lg font-semibold whitespace-nowrap ${
                                        inner?.attributes?.label === "N/A"
                                          ? "!hidden"
                                          : ""
                                      } `}
                                    >
                                      {inner?.attributes?.label || ""}
                                    </div>
                                    {filterHandler(
                                      inner?.attributes?.ChildLinks
                                    )?.map((innerItem, innerIndex) => (
                                      <Link
                                        key={innerIndex}
                                        href={innerItem?.url || "/"}
                                        target={innerItem?.target || "_blank"}
                                      >
                                        <p className="text-base font-normal text-black hover:text-talque-blue-color whitespace-nowrap mt-1">
                                          {innerItem?.label || ""}
                                        </p>
                                      </Link>
                                    ))}
                                  </div>
                                )
                              )}
                            </>
                          )}
                        {item?.media_image?.data?.id &&
                          selectedLink === item?.id && (
                            <div className="mt-4 w-max bg-white shadow-md rounded-lg">
                              {item?.media_image?.data?.attributes?.url ? (
                                <LazyLoadImage
                                  className="rounded-t-md w-[300px] h-[164px] min-w-[300px] object-cover"
                                  src={item?.media_image?.data?.attributes?.url}
                                  altText="Navigation Link"
                                />
                              ) : (
                                renderLogo(
                                  "rounded-t-md w-[300px] h-[164px] min-w-[300px] object-cover"
                                )
                              )}
                              <div className="text-sm px-[15px] py-[16px] w-[300px] break-words">
                                {item?.media_description || ""}
                              </div>
                            </div>
                          )}
                      </div>
                    )
                  )}
                  {navigationsData?.rightside_button?.length > 0 && (
                    <div className="mb-4">
                      {filterHandler(navigationsData?.rightside_button)?.map(
                        (item, index) => (
                          <Link
                            key={index}
                            href="/"
                            className={`mr-3 whitespace-nowrap text-sm font-medium px-4 py-2.5 rounded-full ${getButtonClass(
                              item?.type
                            )}`}
                          >
                            {item?.label}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </nav>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <nav className="bg-white xl:py-5 py-3 2xl:px-60 xl:px-14 px-5 flex items-center justify-between w-full text-talque-primary-color border-b sticky top-0 bottom-0 z-30">
      <div>
        {navigationsData?.leftside_image?.data?.attributes?.url && (
          <LazyLoadImage
            onClick={() => router.push("/")}
            className="w-[100px] object-cover cursor-pointer"
            src={navigationsData?.leftside_image?.data?.attributes?.url}
            altText="Talque"
          />
        )}
      </div>
      {navigationsData?.header_links?.length > 0 && (
        <div className="hidden lg:flex items-center 2xl:gap-12 xl:gap-2 lg:gap-2">
          {filterHandler(navigationsData?.header_links)?.map((item, index) =>
            renderLinks(item, index)
          )}
          {renderLanguages()}
        </div>
      )}
      {navigationsData?.rightside_button?.length > 0 && (
        <div className="hidden lg:flex items-center">
          {renderRightButtons()}
        </div>
      )}
      <div
        className="lg:hidden float-right cursor-pointer"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <button
          type="button"
          className="cursor-pointer bg-white rounded-md p-2 inline-flex items-center justify-center text-black focus:outline-none"
        >
          <Bars3Icon className="h-6 w-6 text-black cursor-pointer" />
        </button>
      </div>
      {open && renderMobileMenu()}
    </nav>
  );
};

export default Header;
