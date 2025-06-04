import { marked } from "marked";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import CompanyLogo from "@/public/images/default-bg.svg";
import Loader from "@/components/Loader";

export const getLocalStorageItem = (key) => {
  return typeof window !== "undefined" ? localStorage.getItem(key) : null;
};

export const LOCALE = JSON.parse(getLocalStorageItem("language"));

export const language = LOCALE?.shortText || "en";

export const DOTS = "...";

export const setLocalStorageItem = (key, value) => {
  const parsedValue = typeof value !== "string" ? JSON.stringify(value) : value;
  return typeof window !== "undefined"
    ? localStorage.setItem(key, parsedValue)
    : null;
};

export const removeLocalStorageItem = (key) => {
  return typeof window !== "undefined" ? localStorage.removeItem(key) : null;
};

export const clearLocalStorage = (key) => {
  return typeof window !== "undefined" ? localStorage.clear() : null;
};

export const getButtonClass = (value) => {
  const css =
    value === "Colored"
      ? "border hover:border-transparent bg-transparent hover:bg-dark-blue hover:text-white"
      : "border border-transparent bg-dark-blue hover:bg-blue-600 text-white";

  return css;
};

export const errorToast = (msg, duration = 4000) =>
  toast.error(msg, {
    duration: duration,
    position: "top-center",
    id: msg,
    style: { maxWidth: "400px" },
  });

export const successToast = (msg, duration = 4000) =>
  toast.success(msg, {
    duration,
    position: "top-center",
    id: msg,
    style: { maxWidth: "400px" },
  });

export const MarkdownRenderer = ({ content }) => {
  const renderer = new marked.Renderer();
  renderer.heading = (text, level) => {
    const headingClass = `${
      level === 1
        ? "text-4xl font-medium mb-2"
        : level === 2
        ? "text-3xl font-medium mb-2"
        : level === 3
        ? "text-2xl font-medium mb-2"
        : level === 4
        ? "text-xl font-medium mb-2"
        : level === 5
        ? "text-lg"
        : level === 6
        ? "text-base text-[#666666]"
        : ""
    } text-black`;
    return `<div class="${headingClass}">${text}</div>`;
  };

  renderer.list = (body, ordered) => {
    const listClass = ordered ? "list-decimal" : "list-disc";
    return `<ul class="${listClass}">${body}</ul>`;
  };

  renderer.listitem = (text) => {
    const listItemClass = "mb-2 text-talque-secondary-color";
    return `<li class="${listItemClass}">${text}</li>`;
  };

  renderer.paragraph = (text) => {
    const paragraphClass = "text-talque-secondary-color";
    return `<p class="${paragraphClass}">${text}</p>`;
  };

  renderer.image = (imgSrc) => {
    const imageClass = "my-5 w-full";
    return `<img src=${imgSrc} class="${imageClass}"></img>`;
  };

  const htmlWithDynamicClasses = marked(content, { renderer });

  return <div dangerouslySetInnerHTML={{ __html: htmlWithDynamicClasses }} />;
};

export const isEvenNumber = (index) => index % 2 === 0;

export const isLastIndex = (array, index) => array?.length - 1 === index;

export const getMonthString = (date) => {
  const currentDate = new Date(date);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthIndex = currentDate.getMonth();
  const monthName = monthNames[monthIndex];
  return monthName;
};

export const dateTimeFormat = (receivedDate) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(receivedDate);
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`;
  return formattedDate;
};

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount,
  currentPage,
}) => {
  return useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    const totalPageNumbers = siblingCount + 5;
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 2 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 2 + 2 * siblingCount;
      let rightRange = range(totalPageCount - rightItemCount, totalPageCount);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);
};

export const isVideo = (data) => data?.teaser_media_type === "Video";

export const SeoComponent = ({ title, seo }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={seo?.metaTitle} />
      <meta name="description" content={seo?.metaDescription} />
      <meta name="type" content="video.movie" />
      <meta
        name="image"
        content={seo?.sharedImage?.media?.data?.attributes?.url}
      />
      <meta
        name="url"
        content="https://loved-symphony-cf7407a623.media.strapiapp.com"
      />
      <meta property="og:title" content={seo?.metaTitle} />
      <meta property="og:description" content={seo?.metaDescription} />
      <meta property="og:type" content="video.movie" />
      <meta
        property="og:image"
        content={seo?.sharedImage?.media?.data?.attributes?.url}
      />
      <meta
        property="og:url"
        content="https://loved-symphony-cf7407a623.media.strapiapp.com"
      />
    </Head>
  );
};

export const filterHandler = (array) => {
  return array?.filter((i) => !i?.is_optional);
};

export const renderLogo = (className) => {
  return (
    <Image
      src={CompanyLogo}
      alt="Logo"
      height={1000}
      width={1000}
      className={`object-cover ${className}`}
      loading="lazy"
    />
  );
};

export const classes = {
  mainTitleClasses:
    "xl:text-7xl lg:text-6xl md:text-5xl text-4xl xl:!leading-[84px] lg:!leading-[64px] md:!leading-[44px] !leading-[50px] font-bold",
  mainDescClasses:
    "lg:!leading-8 md:!leading-7 !leading-6 lg:text-xl text-lg text-base",
  altTitleClasses:
    "xl:text-5xl lg:text-4xl md:text-3xl text-2xl xl:!leading-66 lg:!leading-10 md:!leading-9 !leading-8 font-semibold",
  smallTitleClasses:
    "lg:text-2xl md:text-xl text-lg md:!leading-7 !leading-6 font-semibold",
  smallDescClasses: "md:text-base text-sm md:!leading-6 !leading-5 font-normal",
};

export const mainTitleClass =
  " xl:text-7xl lg:text-6xl md:text-5xl text-4xl xl:!leading-[84px] lg:!leading-[64px] md:!leading-[44px] !leading-[50px] font-bold ";

export const mainDescClass =
  " lg:!leading-8 md:!leading-7 !leading-6 lg:text-xl text-lg text-base ";

export const altTitleClass =
  " xl:text-5xl lg:text-4xl md:text-3xl text-2xl xl:!leading-66 lg:!leading-10 md:!leading-9 !leading-8 font-semibold ";

export const smallTitleClass =
  " lg:text-2xl md:text-xl text-lg md:!leading-7 !leading-6 font-semibold ";

export const smallDescClass =
  " md:text-base text-sm md:!leading-6 !leading-5 font-normal ";

export const LazyLoadImage = ({ src, altText, className }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleImageLoaded(src);
  }, [src]);

  const handleImageLoaded = (image) => {
    // if (image) {
    //   checkImageSrc(image).then((isValid) => {
    //     if (isValid) {
    //       setLoading(false);
    //     } else {
    //       setLoading(true);
    //     }
    //   });
    // }
  };
  const checkImageSrc = (url) => {
    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return true;
        } else {
          return false;
        }
      })
      .catch(() => false);
  };

  return (
    loading && (
      <Image
        src={src}
        alt={altText ? altText : "Background image"}
        height={1000}
        width={1000}
        className={`object-cover ${className}`}
        loading="lazy"
      />
    )
  );
};
