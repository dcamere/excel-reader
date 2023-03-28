import React, { useState } from 'react';
import * as XLSX from 'xlsx';

function App() {
  const [jsonData, setJsonData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setJsonData(json);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {jsonData && (
        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
      )}
    </div>
  );
}

export default App;
