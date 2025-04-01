import { create, BaseDirectory } from '@tauri-apps/plugin-fs';
import { useState } from 'react';
import WarningComponent from './WarningComponent';

const Preview = ({warning, preview, prompt, result, fileName, onPromptChange, onLoading, onSubmit, onErr}: any) => {
    if (warning) return null;
    const [downloadStatus, setDownloadStatus] = useState(false);
    const base64ToUint8Array = (base64: string) => {
        const binaryString = atob(base64); // Decode Base64 to binary string
        const len = binaryString.length;
        const uint8Array = new Uint8Array(len);
        
        for (let i = 0; i < len; i++) {
            uint8Array[i] = binaryString.charCodeAt(i);
        }
    
        return uint8Array;
    }

    const downloadImage = async (result: string) => {
        try {
            setDownloadStatus(false);
            fileName = fileName?.split('.')[0];
            const file = await create(`${fileName}_just_imagine.png`, { baseDir: BaseDirectory.Download });
            await file.write(base64ToUint8Array(result));
            await file.close();
            setTimeout(() => setDownloadStatus(false), 2000);
            setDownloadStatus(true);
          } catch (error) {
            console.error("Error saving image:", error);
            setDownloadStatus(false);
          }
    }

    return (
        <div>
            {preview && (
                <div className="sub-container">
                    <div>
                         <img src={preview} alt="Preview" className="image-preview" />
                         {  Array.isArray(result) && result.length === 2 ? 
                            (   <div>
                                <img src={`data:${result[1]};base64,${result[0]}`} alt="Edited Image" className="image-preview" />
                                <button type="submit" onClick={() => downloadImage(result[0])}>Download</button>
                                {downloadStatus && <p>Image downloaded successfully!</p>}
                                </div>
                            ) : (result.length === 1 ?
                            (
                                <p className="image-preview">{result?.[0]}</p>
                            ) :
                            null)
                         }
                         {
                                onLoading && <p>Loading...</p>
                         }
                         {
                             onErr && <WarningComponent message={onErr} />
                         }
                    </div>
                    <form className="row" onSubmit={(e) => {e.preventDefault(); onSubmit();}}>
                        <input
                            className="custom-width"
                            type="text"
                            value={prompt}
                            onChange={onPromptChange}
                            placeholder="Let your imagination edit this image..."
                        />
                        <button><svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    >
                                <path d="M22 2L11 13" />
                                <path d="M22 2L15 22 11 13 2 9 22 2z" />
                                </svg>
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Preview;