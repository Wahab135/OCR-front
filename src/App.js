import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileSelect = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);
  };

  const sendFiles = async () => {
    const formData = new FormData();
    for (const file of selectedFiles) {
      formData.append("files", file);
    }

    try {
      const response = await axios.post(
        "http://localhost:3005/process",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data.logs);
        console.log("Files sent successfully");
      } else {
        console.error("Error sending files");
      }
    } catch (error) {
      console.error("Error sending files:", error);
    }
  };

  return (
    <div>
      <div className="input-group">
        <input
          className="form-control"
          type="file"
          multiple
          onChange={handleFileSelect}
        />
        <button onClick={sendFiles}>Send Files</button>
      </div>
    </div>
  );
}

export default App;
