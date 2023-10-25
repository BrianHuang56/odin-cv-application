import { useState } from "react";

function ResumeEditorHeader(props) {
    function toggleDrop() {
        if (props.displaySubsec) props.setSection(-2);
        else props.setSection(-1);
        setDisplay(false);
    }

    const [displayForm, setDisplay] = useState(false);

    return (
        <div className="editor-header">
            <button onClick={toggleDrop} className="form-header header-title">Personal Details <img className="drop down" src={props.displaySubsec ? "/menu-up.svg" : "/menu-down.svg"} height="30px"/></button>
            {props.displaySubsec ? 
            <div className="edit-section" style={{animation:"subsecInAnimation 150ms ease-in"}}>
            {!displayForm ? 
                <button className="section-button" onClick={() => setDisplay(!displayForm)}>{props.header.name}</button> : null}
                {displayForm && props.displaySubsec ? 
                <form className="edit-section-form">
                    <button className="close" onClick={e => {
                            e.preventDefault();
                            setDisplay(false);
                            props.revert();
                        }}>
                            <img src="/window-close.svg" height="20px"/>
                    </button>
                    <label>
                        Name <input type="text" id="name" onChange={e => props.onChange("name", e.target.value)} defaultValue={props.header.name || ' '} />
                    </label>
                    <label>
                        Email <input type="email" id="email" onChange={e => props.onChange("email", e.target.value)} defaultValue={props.header.email || ' '}/>
                    </label>
                    <label>
                        Phone Number <input type="tel" id="phone" onChange={e => props.onChange("phone", e.target.value)} defaultValue={props.header.phone || ' '}/>
                    </label>
                    <label>
                        Address <input type="text" id="address" onChange={e => props.onChange("location", e.target.value)} defaultValue={props.header.location || ' '}/>
                    </label>
                    <div id="button-container-header" className="button-container">
                        <button className="save" onClick={e => {
                            e.preventDefault();
                            setDisplay(false);
                            props.save();
                            }}>Save</button>
                    </div>
                </form>
                : null
                } 
            </div> : null}
        </div>
    );
}

export default ResumeEditorHeader;