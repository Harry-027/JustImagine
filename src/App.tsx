import { useState } from "react";
import UploadAndPrompt from "./Form";
import "./App.css";
import { invoke } from "@tauri-apps/api/core";

function App() {
  const [apiKey, setApiKey] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [result, setResult] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(false);

  function showFormComponent() {
    setShowForm(true);
  }

  async function handleSubmit({ file, prompt }: any) {
    setResult([]);
    setLoading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      if (!reader.result) {
        console.error('FileReader result is null');
        setLoading(false);
        return;
      } else {
        const resultString = reader.result?.toString();
        if (resultString && resultString.startsWith('data:')) {
          const base64Data = resultString.split(',')[1];
          try {
            const [imgData, textData] = await invoke<Array<string>>('generate_result', 
              {apiKey, fileType: file.type, fileData: base64Data, userPrompt: prompt});
            if (textData.length == 0) {
              setResult([...imgData]);
            } else {
              setResult([textData]);
            }
            setLoading(false);
          } catch (error) {
            console.error('Upload failed:', error);
            setLoading(false);
          }
        } else {
            console.error('Unexpected file format');
            setLoading(false);
        }
      }
    }
  }

  return (
    <main className="container">
        <h2>Just Imagine</h2>
      { showForm ? <UploadAndPrompt onSubmit={handleSubmit} onResult={result} setResult={setResult} onLoading={loading} /> : 
      <div>
        <div className="row">
            <img src="/logo.svg" className="logo ai" alt="Just Imagine logo" />
        </div>
        <p>Enter your Google Gemini API Key</p>
        <form
          className="row"
          onSubmit={(e) => {
            e.preventDefault();
            showFormComponent();
          }}
        >
        <input
            id="key-input"
            onChange={(e) => setApiKey(e.currentTarget.value)}
            placeholder="API Key here..."
        />
        <button type="submit">+</button>
        </form>
      </div>
}
    </main>
  );
}

export default App;
