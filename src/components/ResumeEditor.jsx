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
        <ResumeEditorHeader header={props.header} onChange={props.onChangeHeader} revert={props.revertHeader} save={props.saveHeader} setSection={setSection} displaySubsec={displaySectionInd === -1} />
        {props.body ? props.body.map((m, ind) => {
            return <ResumeEditorSection ind={ind} displayTripleDot={displayTripleDot === ind} setTripleDot={setTripleDot} displaySubsec={displaySectionInd === ind} setSection={setSection} key={m.key} map={m} onChange={props.onChangeBody} deleteSection={props.delSection} delete={props.deleteMap} revert={props.revertBody} save={props.saveBody}/>
        }) : null}
        <input className="add-section" type="text" placeholder="Add Section" onKeyDown={checkKeyPressed}>
        </input>
    </div>
}

export default ResumeEditor;