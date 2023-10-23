import ResumeEditorHeader from "./ResumeEditorHeader";
import ResumeEditorSection from "./ResumeEditorSection";
import { useState } from "react";

function ResumeEditor(props) {
    const [displaySectionInd, setSection] = useState(-2);
    const [displayTripleDot, setTripleDot] = useState(-1);

    function checkKeyPressed(event) {
        if (event.code === "Enter" && event.currentTarget.value !== "") {
            props.addSection(event.currentTarget.value);
            event.currentTarget.value = "";
        }
    }

    document.addEventListener("click", event => {
        if (event.target.className !== "triple-dot") {
            setTripleDot(-1);
        }
    });

    return <div className="editor-container">
        {props.editType === 0 ? <ResumeEditorHeader header={props.header} onChange={props.onChangeHeader} revert={props.revertHeader} save={props.saveHeader} setSection={setSection} displaySubsec={displaySectionInd === -1} />
        : null}
        {props.body ? props.body.map((m, ind) => {
            return <ResumeEditorSection changeSectionTitle={props.changeSectionTitle} editType={props.editType} ind={ind} insertSection={props.insertSection} displayTripleDot={props.editType === 0 && displayTripleDot === ind} setTripleDot={setTripleDot} displaySubsec={props.editType === 0 && displaySectionInd === ind} setSection={setSection} key={m.key} map={m} onChange={props.onChangeBody} deleteSection={props.delSection} delete={props.deleteMap} revert={props.revertBody} save={props.saveBody}/>
        }) : null}
        {props.editType === 0 ? <input className="add-section" type="text" placeholder="Add Section" onKeyDown={checkKeyPressed} /> : null} 
    </div>
}

export default ResumeEditor;