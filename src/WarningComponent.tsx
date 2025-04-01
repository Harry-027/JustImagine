const WarningComponent = ({message}: {message:string}) => {
    return (
        <div>
            { message && <div className="row"> {message} </div> }
        </div>
    )
}

export default WarningComponent;