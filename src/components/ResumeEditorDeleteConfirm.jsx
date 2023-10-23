function ResumeEditorDeleteConfirm(props) {
    return (
        <dialog id={props.id || props.title}>
            <span className="dialog-confirmation">Are you sure you want to delete this?</span>
            <div className="dialog-button-container">
                <button id="no" onClick={e => {
                    e.preventDefault();
                    e.currentTarget.parentElement.parentElement.close();
                }}>No</button>
                <button id="yes" onClick={e => {
                    e.preventDefault();
                    if (props.setForm) {
                        props.delete(props.title, props.id);
                        props.setForm(-1);
                    }
                    else {
                        props.delete(props.title);
                        props.setTripleDot(-2);
                    }
                }}>Yes</button>
            </div>
        </dialog>
    )
}

export default ResumeEditorDeleteConfirm;