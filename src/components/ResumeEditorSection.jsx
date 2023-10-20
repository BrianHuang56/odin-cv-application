import ResumeEditorSectionList from "./ResumeEditorSectionList";
import ResumeEditorForm from "./ResumeEditorForm";
import { useState } from "react";
import "../styles/ResumeEditorSection.css";

function ResumeEditorSection(props) {
    const [formInd, setFormInd] = useState(-1);
    const [addForm, setAddForm] = useState(-1);

    function toggleDrop() {
        if (props.displaySubsec) props.setSection(-2);
        else props.setSection(props.ind);
        setFormInd(-1);
        setAddForm(-1);
    }

    return (
        <div className="edit-section-container">
            <div className="edit-section-header">
                <button onClick={toggleDrop} className="header-title">{props.map.title}<img className="drop down" src={props.displaySubsec ? "/menu-up.svg" : "/menu-down.svg"} height="30px"/></button>
            </div>
            {props.map.list && props.displaySubsec ? props.map.list.map((l, ind) => {
                return <ResumeEditorSectionList showForm={formInd === ind} sectionInd={props.ind} setSection={props.setSection} ind={ind} setAddForm={setAddForm} setFormInd={setFormInd} title={props.map.title} key={l.key} list={l} onChange={props.onChange} delete={props.delete} revert={props.revert} save={props.save}/>
            }) : null}
            {props.displaySubsec ? <div className="add-subsection">
                {addForm === -1 ? 
                    <button className="section-button" onClick={() => {
                        setAddForm(0);
                        setFormInd(-1);
                    }}>Add Subsection</button> :
                    <ResumeEditorForm list={{"key": "temp"}} title={props.map.title} onChange={props.onChange} revert={props.revert} setForm={setAddForm} save={props.save}/>}
            </div> : null}
        </div>
    );
}

export default ResumeEditorSection;