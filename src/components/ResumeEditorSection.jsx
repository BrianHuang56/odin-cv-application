import ResumeEditorSectionList from "./ResumeEditorSectionList";
import ResumeEditorForm from "./ResumeEditorForm";
import { useState } from "react";
import ResumeEditorDeleteConfirm from "./ResumeEditorDeleteConfirm";
import "../styles/ResumeEditorSection.css";

function ResumeEditorSection(props) {
    const [formInd, setFormInd] = useState(-1);
    const [addForm, setAddForm] = useState(-1);

    function checkClick(event) {
        if (event.target.className === "section-change") return;
        if (event.target.className !== "triple-dot" && event.target.parentElement.className !== "triple-dot-drop") toggleDrop();
        else if (event.target.parentElement.className === "triple-dot-drop") props.setTripleDot(-2);
        else props.setTripleDot(props.ind);
    }

    function removeInput(event) {
        if (event.target.className !== "section-change") {
            const input = document.querySelector(".section-change");
            const span = input.parentElement;
            input.remove();
            span.innerHTML = props.map.title;
        }
    }

    function changeSectionName(event) {
        if (event.currentTarget.value === "" || !props.changeSectionTitle(props.ind, event.currentTarget.value)) {
            console.log("Replace");
            const span = event.currentTarget.parentElement;
            event.currentTarget.remove();
            span.innerHTML = CSS.escape(props.map.title);
        }
    }

    function moveSection(event) {
        if (event.target.parentElement.className !== "triple-dot-drop" && event.target.className !== "triple-dot") {
            document.addEventListener("mousemove", dragMouse);
            document.addEventListener("mouseup", closeDragMouse);
            const section = event.currentTarget.parentElement.parentElement;
            const placeHolder = document.createElement("div");
            placeHolder.style.height = section.offsetHeight + 8 + "px";
            placeHolder.style.width = section.offsetWidth + 8 + "px";
            placeHolder.id = "placeholder";
            section.parentElement.insertBefore(placeHolder, section.nextSibling);
            section.style.width = section.offsetWidth + "px";
            section.style.position = "fixed";
            section.style.zIndex = "200";
            let xPos = 0;
            let yPos = -document.documentElement.scrollTop;
            section.style.transform = `translate(${xPos}px, ${yPos}px)`;

            function dragMouse(event) {    
                xPos += event.movementX;
                yPos += event.movementY;
                section.style.transform = `translate(${xPos}px, ${yPos}px)`;
            }

            function closeDragMouse(event) {
                document.getElementById("placeholder").remove();
                document.removeEventListener("mouseup", closeDragMouse);
                document.removeEventListener("mousemove", dragMouse);
                const currY = event.clientY;
                section.style.position = null;
                section.style.transform = null;
                section.style.width = null;
                section.style.zIndex = null;
                const editContainer = document.querySelector(".editor-container");
                const children = editContainer.children;
                for (var i = 0;i < children.length;i++) {
                    var rect = children[i].getBoundingClientRect();
                    var offset = children[i].clientHeight / 2;
                    if (rect.y - offset >= currY) {
                        props.insertSection(props.ind, i);
                        return;
                    }
                }
                props.insertSection(props.ind, children.length);
            }
        }
    }

    function toggleDrop() {
        if (props.displaySubsec) props.setSection(-2);
        else props.setSection(props.ind);
        setFormInd(-1);
        setAddForm(-1);
    }

    return (
        <div className={props.editType === 0 ? "edit-section-container" : "edit-section-container drag"}>
            <div className="edit-section-header">
                <button onClick={props.editType === 0 ? e => checkClick(e) : null} onMouseDown={props.editType === 1 ? moveSection : null} className="header-title">
                    <span>
                        {props.map.title}
                    </span>
                    {props.editType === 0 ?
                    <div className="header-right">
                        <img className="drop down" src={props.displaySubsec ? "/menu-up.svg" : "/menu-down.svg"} height="30px"/>
                        <img className="triple-dot" src="/dots-vertical.svg" height="25px"/>
                        {props.displayTripleDot ? <div className="triple-dot-drop">
                            <div onMouseUp={e => {
                                e.stopPropagation();
                                const span = e.currentTarget.parentElement.parentElement.parentElement.querySelector("span");
                                const input = document.createElement("input");
                                input.type = "text";
                                input.placeholder = props.map.title;
                                input.style.fontSize = "20px";
                                input.className = "section-change";
                                span.innerHTML = "";
                                span.appendChild(input);
                                input.focus();
                                document.addEventListener("mouseup", removeInput);
                                input.addEventListener("keydown", (e) => {
                                    if (e.code === "Enter") {
                                        document.removeEventListener("mouseup", removeInput)
                                        changeSectionName(e);
                                    }
                                });
                            }}>Edit Name</div>
                            <div onMouseUp={() => {
                                document.querySelector("#" + CSS.escape(props.map.title)).showModal();
                            }}>Delete</div>
                        </div> : null}
                    </div>
                    : null}
                </button>
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
            <ResumeEditorDeleteConfirm delete={props.deleteSection} title={props.map.title} setTripleDot={props.setTripleDot} />
        </div>
    );
}

export default ResumeEditorSection;