import { DOTS, usePagination } from "@/utils/helper";
import { PaginationValues } from "@/utils/constant";
import PreviousIcon from "@/public/images/pagination-prev.svg";
import NextIcon from "@/public/images/pagination-next.svg";
import Image from "next/image";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount = PaginationValues.totalCount,
    siblingCount = PaginationValues.siblingCount,
    currentPage = PaginationValues.currentPage,
    pageSize = PaginationValues.pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  let lastPage = paginationRange[paginationRange?.length - 1];

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <>
      <div className="flex items-center gap-6">
        <Image
          className={`w-[50px] ${
            currentPage !== 1
              ? "cursor-pointer"
              : "cursor-not-allowed opacity-40"
          }`}
          src={PreviousIcon}
          alt="Previous Icon"
          onClick={currentPage !== 1 ? onPrevious : null}
          height={1000}
          width={1000}
        />
        {paginationRange?.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return <div key={index}>...</div>;
          } else {
            return (
              <div
                key={index}
                className={`border ${
                  pageNumber === currentPage
                    ? "bg-dark-blue text-white border-transparent"
                    : "cursor-pointer"
                } rounded-full w-[50px] h-[50px] font-medium text-xl flex justify-center items-center`}
                onClick={() =>
                  pageNumber !== currentPage && onPageChange(pageNumber)
                }>
                {pageNumber}
              </div>
            );
          }
        })}
        <Image
          className={`w-[50px] ${
            currentPage !== lastPage
              ? "cursor-pointer"
              : "cursor-not-allowed opacity-40"
          }`}
          src={NextIcon}
          alt="Next Icon"
          onClick={currentPage !== lastPage ? onNext : null}
          height={1000}
          width={1000}
        />
      </div>
    </>
  );
};

export default Pagination;
