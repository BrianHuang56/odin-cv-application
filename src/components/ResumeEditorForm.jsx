import ResumeEditorDeleteConfirm from "./ResumeEditorDeleteConfirm";

function ResumeEditorForm(props) {
    return(
        <form className="edit-section-form">
            <button className="close" onClick={e => {
                e.preventDefault();
                props.setForm(-1);
                props.revert();
            }}>
                <img src="/window-close.svg" height="20px"/>
        </button>
            <label>
                Name <input autoComplete="off" type="text" id="name" required onChange={e => props.onChange("name", e.target.value, props.title, props.list.key)} defaultValue={props.list.name || ''} />
            </label>
            <label>
                Location <input autoComplete="off" type="text" id="location" onChange={e => props.onChange("location", e.target.value, props.title, props.list.key)} defaultValue={props.list.location || ''}/>
            </label>
            <div className="date-container">
                <label>
                    Start Date <input autoComplete="off" type="text" id="startdate" onChange={e => props.onChange("datestart", e.target.value, props.title, props.list.key)} defaultValue={props.list.datestart || ''}/>
                </label>
                <label>
                    End Date <input autoComplete="off" type="text" id="enddate" onChange={e => props.onChange("dateend", e.target.value, props.title, props.list.key)} defaultValue={props.list.dateend || ''}/>
                </label>
            </div>
            <label>
                Title <input autoComplete="off" type="text" id="title" onChange={e => props.onChange("title", e.target.value, props.title, props.list.key)} defaultValue={props.list.title || ''}/>
            </label>
            <label>
                Description <textarea type="text" id="desc" onChange={e => props.onChange("description", e.target.value, props.title, props.list.key)} defaultValue={props.list.description || ''}/>
            </label>
            <div className="button-container">
                {props.list.key !== "temp" ?
                    <button className="delete" onClick={e => {
                        e.preventDefault();
                        const dialog = document.querySelector("#" + CSS.escape(props.list.key));
                        dialog.showModal();
                    }}>
                        Delete
                    </button>:
                    <div></div>    
                }
                <button className="save" onClick={e => {
                    const name = document.querySelector("#name");
                    const startdate = document.querySelector("#startdate");
                    const enddate = document.querySelector("#enddate");
                    var error = false;
                    if (name.value === "") {
                        error = true;
                        name.setCustomValidity("This value is required.");
                        name.addEventListener("input", function removeError() {
                            name.setCustomValidity("");
                            name.removeEventListener("input", removeError);
                        });
                    }
                    if (startdate.value === "") {
                        error = true;
                        startdate.setCustomValidity("This value is required.");
                        startdate.addEventListener("input", function removeError() {
                            startdate.setCustomValidity("");
                            startdate.removeEventListener("input", removeError);
                        });
                    }
                    if (enddate.value === "") {
                        error = true;
                        enddate.setCustomValidity("This value is required.");
                        enddate.addEventListener("input", function removeError() {
                            enddate.setCustomValidity("");
                            enddate.removeEventListener("input", removeError);
                        });
                    }
                    if (!error) {
                        e.preventDefault();
                        props.save(props.title, props.list.key);
                        props.setForm(-1);
                    }
                }}>
                    Save
                </button>
            </div>
            <ResumeEditorDeleteConfirm title={props.title} id={props.list.key} delete={props.delete} setForm={props.setForm}/>
        </form>
    );
}

export default ResumeEditorForm;