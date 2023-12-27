import { parse } from "json2csv";

const downloadCSV = (json: any[]) => {
  const convertToCSV = (data: any[]) => {
    if (data.length === 0) {
      return "";
    }
    const fields = Object.keys(data[0]);
    const csv = parse(data, { fields });
    return csv;
  };

  const csv = convertToCSV(json);
  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = "data.csv";

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export default downloadCSV;
