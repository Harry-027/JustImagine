import { useEffect, useState } from "react";
import UploadAndPrompt from "./Form";
import "./App.css";
import { invoke } from "@tauri-apps/api/core";
import { exists, BaseDirectory, readFile, create } from '@tauri-apps/plugin-fs';
import ApiKey from "./ApiKey";

const apiKeyFile = 'JustImagineApiKey.txt';

function App() {
  const [apiKey, setApiKey] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [result, setResult] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const loadFile = async () => {
      try {
          let apiKeyExists = await exists(apiKeyFile, { baseDir: BaseDirectory.Download });
          if (apiKeyExists) {
            const content = await readFile(apiKeyFile, { baseDir: BaseDirectory.Download });
            const decoder = new TextDecoder('utf-8');
            const apiKey = decoder.decode(content);
              setApiKey(apiKey);
              setShowForm(true);
          }
      } catch (error) {
        console.error('Error loading ApiKey:', error);
      } 
    };

    loadFile();
  }, []);

  async function showFormComponent() {
    const file = await create(apiKeyFile, { baseDir: BaseDirectory.Download});
    await file.write(new TextEncoder().encode(apiKey));
    await file.close();
    setErrMsg('');
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
          } catch (error: any) {
            console.error('Upload failed:', error);
            setLoading(false);
            setErrMsg(`Upload failed. Please try again: ${error}`);
          }
        } else {
            console.error('Unexpected file format');
            setLoading(false);
        }
      }
    }
  }

  const handleUpdateKey = () => {
    setShowForm(false);
  }

  return (
    <main className="container">
      { showForm && <div>
            <button className="api-key" onClick={handleUpdateKey}>Update ApiKey</button>
        </div>
      }
        <h2>Just Imagine</h2>
      { showForm ? <UploadAndPrompt onSubmit={handleSubmit} onResult={result} setResult={setResult} onLoading={loading} onError={errMsg} /> : 
        <ApiKey showFormComponent={showFormComponent} setApiKey={setApiKey} />
}
    </main>
  );
}

export default App;
