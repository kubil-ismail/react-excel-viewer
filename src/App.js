import ExcelViewer from "excel-viewer";
import { useSearchParams } from "react-router-dom";
import React from "react";

function App() {
  const [searchParams] = useSearchParams();
  const url = searchParams.get("url");

  React.useEffect(() => {
    if (url) {
      new ExcelViewer("#excel-view", url, { themeBtn: false });
    }
  }, [url]);

  return (
    <div className="App">
      <div className="overlay" />
      <div id="excel-view"></div>
    </div>
  );
}

export default App;
