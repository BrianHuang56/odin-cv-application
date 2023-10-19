import ResumeEditorSectionList from "./ResumeEditorSectionList";
import ResumeEditorForm from "./ResumeEditorForm";
import { useState } from "react";
import "../styles/ResumeEditorSection.css";

function ResumeEditorSection(props) {
    const [formInd, setFormInd] = useState(-1);
    const [addForm, setAddForm] = useState(-1);
    return (
        <div className="edit-section-container">
            <div className="edit-section-header">
                <div className="header-title">{props.map.title}</div>
            </div>
            {props.map.list ? props.map.list.map((l, ind) => {
                return <ResumeEditorSectionList showForm={formInd === ind && props.displayForm} sectionInd={props.ind} setSection={props.setSection} ind={ind} setAddForm={setAddForm} setFormInd={setFormInd} title={props.map.title} key={l.key} list={l} onChange={props.onChange} delete={props.delete} revert={props.revert} save={props.save}/>
            }) : null}
            <div className="add-subsection">
                {addForm === -1 || !props.displayForm ? 
                    <button className="section-button" onClick={() => {
                        props.setSection(props.ind);
                        setAddForm(0);
                        setFormInd(-1);
                    }}>Add Subsection</button> :
                    <ResumeEditorForm list={{"key": "temp"}} title={props.map.title} onChange={props.onChange} revert={props.revert} setForm={setAddForm} save={props.save}/>}
            </div>
        </div>
    );
}

export default ResumeEditorSection;