import { useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

///////////////////////////////////////////
///// this is causing a build error////////
///////////////////////////////////////////
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export const PdfRender = ({ src }: { src: string }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const nextPage = () => {
    if (pageNumber < numPages!) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  };

  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prevPageNumber) => prevPageNumber - 1);
    }
  };

  return (
    <>
      <div className="relative border-[2px] border-gray-200 w-full md:w-fit h-[100%] border-dashed flex items-center group overflow-scroll">
        <Document
          file={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${src}`}
          onLoadSuccess={onDocumentLoadSuccess}
          className={"w-fit h-[100%]"}
        >
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
        <button
          className="hidden w-12 h-12 rounded-full bg-gray-100 hover:cursor-pointer shadow-inner text-white py-2 px-4 absolute -left-0 group-hover:flex items-center justify-center"
          onClick={prevPage}
          disabled={pageNumber === 1}
        >
          <GrPrevious size={30} color="black" />
        </button>
        <button
          className="hidden w-12 h-12 rounded-full bg-gray-100 hover:cursor-pointer shadow-inner text-white py-2 px-4 absolute right-0 group-hover:flex items-center justify-center"
          onClick={nextPage}
          disabled={pageNumber === numPages}
        >
          <GrNext size={30} color="black" />
        </button>
      </div>
      {numPages && (
        <p className="bottom-0 bg-white text-gray-600 p-2">
          Page {pageNumber} of {numPages}
        </p>
      )}
    </>
  );
};
