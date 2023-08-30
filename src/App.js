import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [responseFileNames, setResponseFileNames] = useState([]);

  const handleFileSelect = (event) => {
    const files = event.target.files;
    const fileNames = Array.from(files).map((file) => file.name);
    setSelectedFiles(fileNames);
  };

  const sendFileNames = async () => {
    try {
      const response = await axios.post("http://localhost:3005/process", {
        fileNames: selectedFiles,
      });

      if (response.status === 200) {
        console.log("File names sent successfully");
        setResponseFileNames(response.data.logs); // Update state with response data
      } else {
        console.error("Error sending file names");
      }
    } catch (error) {
      console.error("Error sending file names:", error);
    }
  };

  return (
    <div>
      <div className="input-group mb-3">
        <input
          className="form-control"
          type="file"
          id="formFileMultiple"
          multiple
          onChange={handleFileSelect}
        />
        <button onClick={sendFileNames}>Send File Names</button>
      </div>
      {/* Display response file names */}
      {responseFileNames.length > 0 && (
        <div className="input-group mb-3">
          <h2>Response</h2>
          <ul>
            {responseFileNames.map((fileName, index) => (
              <li key={index}>{fileName}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
