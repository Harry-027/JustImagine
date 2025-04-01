
const Preview = ({warning, preview, prompt, result, onPromptChange, onLoading, onSubmit}: any) => {
    if (warning) return null;

    return (
        <div>
            {preview && (
                <div className="sub-container">
                    <div>
                         <img src={preview} alt="Preview" className="image-preview" />
                         {  Array.isArray(result) && result.length === 2 ? 
                            (
                                <img src={`data:${result[1]};base64,${result[0]}`} alt="Edited Image" className="image-preview" />
                            ) : (result.length === 1 ?
                            (
                                <p className="image-preview">{result?.[0]}</p>
                            ) :
                            null)
                         }
                         {
                                onLoading && <p>Loading...</p>
                         }
                    </div>
                    <form className="row" onSubmit={(e) => {e.preventDefault(); onSubmit();}}>
                        <input
                            className="custom-width"
                            type="text"
                            value={prompt}
                            onChange={onPromptChange}
                            placeholder="Let your thoughts edit this image..."
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