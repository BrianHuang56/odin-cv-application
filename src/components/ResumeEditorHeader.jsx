import { useState } from "react";

function ResumeEditorHeader(props) {
    return (
        <div className="editor-header">
            <div className="form-header">Personal Details</div>
            {!props.displayForm ? 
                <button className="section-button" onClick={() => props.setSection(-1)}>{props.header.name}</button> :
                <form className="edit-section-form">
                    <button className="close" onClick={e => {
                            e.preventDefault();
                            props.setSection(-2);
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
                            props.setSection(-2);
                            props.save();
                            }}>Save</button>
                    </div>
                </form>
                }
        </div>
    );
}

export default ResumeEditorHeader;