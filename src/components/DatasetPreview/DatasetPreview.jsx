import React, { useState, useEffect } from "react";
import axios from "axios";

const DatasetPreview = ({ datasetId }) => {
  const [previewData, setPreviewData] = useState(null);

  useEffect(() => {
    const fetchPreviewData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:3838/api/project/preview-dataset",
          { datasetId },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPreviewData(response.data);
      } catch (error) {
        console.error("Error fetching dataset preview:", error);
      }
    };

    fetchPreviewData();
  }, [datasetId]);

  if (!previewData) {
    return <div>Loading dataset preview...</div>;
  }

  return (
    <div className="mt-4">
      <h3 className="text-2xl font-semibold mb-2 mt-10">Preview</h3>
      <div className="mb-16">
        <h4 className="text-lg font-semibold mb-1 mt-5">Summary</h4>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2">Column Name</th>
              <th className="px-4 py-2">Data Count</th>
              <th className="px-4 py-2">Mean</th>
              <th className="px-4 py-2">Std</th>
              <th className="px-4 py-2">Min</th>
              <th className="px-4 py-2">Median</th>
              <th className="px-4 py-2">Max</th>
              <th className="px-4 py-2">Variance</th>
            </tr>
          </thead>
          <tbody>
            {previewData.jsonSummary.map((summary) => (
              <tr key={summary.column}>
                <td className="border px-4 py-2">{summary.column}</td>
                <td className="border px-4 py-2">{summary.count}</td>
                <td className="border px-4 py-2">{summary.mean}</td>
                <td className="border px-4 py-2">{summary.std}</td>
                <td className="border px-4 py-2">{summary.min}</td>
                <td className="border px-4 py-2">{summary.median}</td>
                <td className="border px-4 py-2">{summary.max}</td>
                <td className="border px-4 py-2">{summary.variance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-1 mt-5">Content of the file</h4>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              {previewData.columns.map((column) => (
                <th key={column} className="px-4 py-2">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {previewData.headValues.map((row, index) => (
              <tr key={index}>
                {row.map((value, idx) => (
                  <td key={idx} className="border px-4 py-2">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DatasetPreview;
