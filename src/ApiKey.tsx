const ApiKey = ({showFormComponent, setApiKey}: any) => {
    return (
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
        <input type="password"
            id="key-input"
            onChange={(e) => setApiKey(e.currentTarget.value)}
            placeholder="API Key here..."
        />
        <button type="submit">+</button>
        </form>
      </div>
    )
}

export default ApiKey;