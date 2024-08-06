import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useSearchParams } from "react-router-dom";
import {
  ArrowDownTrayIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  ArrowDownOnSquareIcon,
} from "@heroicons/react/24/solid";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

export default function MyApp() {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

  const [searchParams] = useSearchParams();
  const url = searchParams.get("url");
  const filename = url.split("/")[url.split("/").length - 1];

  const [width, setWidth] = useState(0);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    setWidth(window.document.body.clientWidth - 50);
  }, []);

  const handleMinScale = () => {
    setScale((prevScale) => {
      const newScale = Math.max(prevScale - 0.1, 0.1); // Min scale is 10%
      return newScale;
    });
  };

  const handleMaxScale = () => {
    setScale((prevScale) => {
      const newScale = Math.min(prevScale + 0.1, 2); // Max scale is 200%
      return newScale;
    });
  };

  const handleDownload = () => {
    if (!url) return;

    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = filename; // Set the name of the downloaded file
        link.click();
      })
      .catch((error) => console.error("Error downloading file:", error));
  };

  const scalePercentage = Math.round(scale * 100); // Convert scale to percentage

  return (
    <div>
      <div className="header">
        <span className="text-neutral-950">{filename}</span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "-60px",
          }}
        >
          <MinusCircleIcon
            style={{
              width: "15px",
              fontWeight: "bold",
              marginRight: "10px",
              cursor: "pointer",
            }}
            className="btn-neutral-500"
            onClick={handleMinScale}
          />
          <div
            style={{
              padding: "5px",
              marginRight: "10px",
              marginLeft: "5px",
              borderRadius: "4px",
            }}
            className="neutral-400"
          >
            <span style={{ fontSize: "14px" }}>{scalePercentage}%</span>
          </div>
          <PlusCircleIcon
            style={{
              width: "15px",
              fontWeight: "bold",
              marginRight: "10px",
              cursor: "pointer",
            }}
            className="btn-neutral-500"
            onClick={handleMaxScale}
          />
        </div>
        <ArrowDownOnSquareIcon
          style={{
            width: "20px",
            fontWeight: "bold",
            marginRight: "10px",
            cursor: "pointer",
          }}
          className="btn-neutral-500"
          onClick={handleDownload}
        />
      </div>
      <div className="spacer" />
      {url && (
        <Document file={url}>
          <Page width={width} pageNumber={1} scale={scale} />
        </Document>
      )}
    </div>
  );
}
