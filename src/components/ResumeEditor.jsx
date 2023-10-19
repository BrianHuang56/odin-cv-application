import ResumeEditorHeader from "./ResumeEditorHeader";
import ResumeEditorSection from "./ResumeEditorSection";
import { useState } from "react";

function ResumeEditor(props) {
    const [displaySectionInd, setSection] = useState(-2);

    function checkKeyPressed(event) {
        if (event.code === "Enter" && event.currentTarget.value !== "") {
            props.addSection(event.currentTarget.value);
            event.currentTarget.value = "";
        }
    }

    return <div className="editor-container">
        <ResumeEditorHeader header={props.header} onChange={props.onChangeHeader} revert={props.revertHeader} save={props.saveHeader} setSection={setSection} displayForm={displaySectionInd === -1} />
        {props.body ? props.body.map((m, ind) => {
            return <ResumeEditorSection ind={ind} displayForm={displaySectionInd === ind} setSection={setSection} key={m.key} map={m} onChange={props.onChangeBody} delete={props.deleteMap} revert={props.revertBody} save={props.saveBody}/>
        }) : null}
        <input className="add-section" type="text" placeholder="Add Section" onKeyDown={checkKeyPressed}>
        </input>
    </div>
}

export default ResumeEditor;