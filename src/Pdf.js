import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useSearchParams } from "react-router-dom";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

export default function MyApp() {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

  const [searchParams] = useSearchParams();
  const url = searchParams.get("url");

  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.document.body.clientWidth - 50);
  }, []);

  return (
    <div>
      {url && (
        <Document file={url}>
          <Page width={width} pageNumber={1} />
        </Document>
      )}
    </div>
  );
}
