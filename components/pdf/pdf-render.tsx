"use client";
import { Fragment, useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

///////////////////////////////////////////
///// this is causing a build error////////
///////////////////////////////////////////
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();

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
    <Fragment>
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
    </Fragment>
  );
};

// import { GrNext, GrPrevious } from "react-icons/gr";
// import { Fragment, useEffect, useRef, useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// export function PdfRender(file: any) {
//   const [numPages, setNumPages] = useState<number>(0);
//   const [pageNumber, setPageNumber] = useState<number>(1); // start on first page
//   const [loading, setLoading] = useState(true);
//   const [pageWidth, setPageWidth] = useState(0);

//   function onDocumentLoadSuccess({
//     numPages: nextNumPages,
//   }: {
//     numPages: number;
//   }) {
//     setNumPages(nextNumPages);
//   }

//   function onPageLoadSuccess() {
//     setPageWidth(window.innerWidth);
//     setLoading(false);
//   }

//   const options = {
//     cMapUrl: "cmaps/",
//     cMapPacked: true,
//     standardFontDataUrl: "standard_fonts/",
//   };

//   // Go to next page
//   function goToNextPage() {
//     setPageNumber((prevPageNumber) => prevPageNumber + 1);
//   }

//   function goToPreviousPage() {
//     setPageNumber((prevPageNumber) => prevPageNumber - 1);
//   }

//   return (
//     <Fragment>
//       <Nav pageNumber={pageNumber} numPages={numPages} />
//       <div
//         hidden={loading}
//         style={{ height: "calc(100vh - 64px)" }}
//         className="flex items-center"
//       >
//         <div
//           className={`flex items-center justify-between w-full absolute z-10 px-2`}
//         >
//           <button
//             onClick={goToPreviousPage}
//             disabled={pageNumber <= 1}
//             className="relative h-[calc(100vh - 64px)] px-2 py-24 text-gray-400 hover:text-gray-50 focus:z-20"
//           >
//             <span className="sr-only">Previous</span>
//             <GrPrevious className="h-10 w-10" aria-hidden="true" />
//           </button>
//           <button
//             onClick={goToNextPage}
//             disabled={pageNumber >= numPages!}
//             className="relative h-[calc(100vh - 64px)] px-2 py-24 text-gray-400 hover:text-gray-50 focus:z-20"
//           >
//             <span className="sr-only">Next</span>
//             <GrNext className="h-10 w-10" aria-hidden="true" />
//           </button>
//         </div>

//         <div className="h-full flex justify-center mx-auto">
//           <Document
//             file={file}
//             onLoadSuccess={onDocumentLoadSuccess}
//             options={options}
//             renderMode="canvas"
//             className=""
//           >
//             <Page
//               className=""
//               key={pageNumber}
//               pageNumber={pageNumber}
//               renderAnnotationLayer={false}
//               renderTextLayer={false}
//               onLoadSuccess={onPageLoadSuccess}
//               onRenderError={() => setLoading(false)}
//               width={Math.max(pageWidth * 0.8, 390)}
//             />
//           </Document>
//         </div>
//       </div>
//     </Fragment>
//   );
// }

// function Nav({pageNumber, numPages}: {pageNumber: number, numPages: number}) {
//   return (
//     <nav className="bg-black">
//       <div className="mx-auto px-2 sm:px-6 lg:px-8">
//         <div className="relative flex h-16 items-center justify-between">
//           <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
//             <div className="flex flex-shrink-0 items-center">
//               <p className="text-2xl font-bold tracking-tighter text-white">
//                 Papermark
//               </p>
//             </div>
//           </div>
//           <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//             <div className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium">
//               <span>{pageNumber}</span>
//               <span className="text-gray-400"> / {numPages}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// import React, { Fragment } from "react";

// export const PdfRender = ({ file }: { file: string }) => {
//   return (
//     <Fragment>
//       {/* <iframe
//         src={`${process.env.NEXT_PUBLIC_FILE_URL}/${file}`}
//         width={"500px"}
//         height={"500px"}
//         sandbox="allow-scripts"
//         loading="lazy"
//         allowFullScreen
//       >
//         <a href={`${process.env.NEXT_PUBLIC_FILE_URL}/${file}`}>
//           Download the PDF
//         </a>
//       </iframe> */}
//       <embed
//         src={`${process.env.NEXT_PUBLIC_FILE_URL}/${file}`}
//         type="application/pdf"
//         width="100%"
//         height="100%"
//       ></embed>
//     </Fragment>
//   );
// };
