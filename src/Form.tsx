import { useState } from 'react';
import WarningComponent from './WarningComponent';
import Preview from './Preview';

const UploadAndPrompt = ({ onSubmit, onResult, setResult, onLoading }: any) => {

    const [file, setFile] = useState<File | null>(null);
    const [prompt, setPrompt] = useState('');
    const [warning, setWarning] = useState('');
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      
      if(e.target.files && e.target.files.length > 0) { 
        const uploadedFile = e.target.files[0];
        if (!uploadedFile.type.startsWith('image/')) {
            setWarning('Please upload an image file.');
            return;
        }
        if (uploadedFile) {
            setFile(uploadedFile);
            setPreview(URL.createObjectURL(uploadedFile));
            setWarning('');
            setResult([]);
          }
        }
      };
    
      const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value);
        setWarning('');
      };
    
      const handleSubmit = () => {
        if (file && prompt) {
          onSubmit({ file, prompt });
        } else {
          setWarning('Please upload a file and enter a prompt to update the image.');
        }
      };

    return (
     <div className="sub-container">
        <WarningComponent message={warning} />
        <div className="sub-container">
            <div className="row">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>
          <Preview warning={warning} preview={preview} prompt={prompt} onPromptChange={handlePromptChange} onSubmit={handleSubmit} onLoading={onLoading} result={onResult} />
        </div>
    </div>
    );
}

export default UploadAndPrompt