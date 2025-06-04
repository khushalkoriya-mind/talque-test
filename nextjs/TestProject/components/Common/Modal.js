import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Logo from "@/public/images/talque-logo.svg";
import { LazyLoadImage, MarkdownRenderer, classes } from "@/utils/helper";
import Image from "next/image";

const Modal = ({ forAllFeatures, isModalOpen, setIsModalOpen, url, data }) => {
  const closeModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const renderVideo = (src, className) => {
    return (
      <video autoPlay={true} loop controls className={`w-full ${className}`}>
        <source src={src} type="video/webm" />
      </video>
    );
  };

  const renderCloseIcon = () => {
    return (
      <XMarkIcon
        onClick={() => closeModal()}
        className="text-black hover:text-gray-800 lg:w-[36px] w-[32px] cursor-pointer"
      />
    );
  };

  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[50]" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="transform rounded-[20px] bg-white text-left align-middle shadow-xl transition-all 2xl:w-[36%] xl:w-[48%] lg:w-[68%] w-full">
                {forAllFeatures ? (
                  <>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium !leading-6 text-gray-900 bg-white px-5 sticky top-0 bottom-0 py-4 rounded-t-[20px] lg:block flex justify-between items-center">
                      <div
                        className={`${"lg:text-2xl md:text-xl text-lg md:!leading-7 !leading-6 font-semibold"} lg:hidden block`}>
                        {data?.title}
                      </div>
                      <div className="place-content-end grid">
                        {renderCloseIcon()}
                      </div>
                    </Dialog.Title>
                    <div className="lg:px-10 px-5 overflow-auto max-h-[600px] lg:pb-10 pb-5 no-scrollbar">
                      <div
                        className={`${"lg:text-2xl md:text-xl text-lg md:!leading-7 !leading-6 font-semibold"} lg:mb-4 mb-2 lg:block hidden`}>
                        {data?.title}
                      </div>
                      <MarkdownRenderer content={data?.description} />
                      {data?.video_file?.data ? (
                        renderVideo(
                          data?.video_file?.data?.attributes?.url,
                          "my-8"
                        )
                      ) : (
                        <div className="min-h-[30vh] text-xl font-medium flex items-center justify-center">
                          No video found
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium !leading-6 text-gray-900 mb-4 p-5">
                      <div className="flex justify-between items-center">
                        <div>
                          <Image
                            className="min-w-[100px] max-w-[100px] object-cover"
                            src={Logo}
                            alt="Talque"
                            height={1000}
                            width={1000}
                          />
                        </div>
                        <div>{renderCloseIcon()}</div>
                      </div>
                    </Dialog.Title>
                    {url ? (
                      renderVideo(url, "rounded-xl px-5 pb-5")
                    ) : (
                      <div className="min-h-[30vh] text-xl font-medium flex items-center justify-center">
                        No video found
                      </div>
                    )}
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
