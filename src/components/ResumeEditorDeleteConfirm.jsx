function ResumeEditorDeleteConfirm(props) {
    return (
        <dialog>
            <span className="dialog-confirmation">Are you sure you want to delete this?</span>
            <div className="dialog-button-container">
                <button id="no" onClick={e => {
                    e.preventDefault();
                    e.currentTarget.parentElement.parentElement.close();
                }}>No</button>
                <button id="yes" onClick={e => {
                    e.preventDefault();
                    props.delete(props.title, props.id);
                    props.setForm(-1);
                }}>Yes</button>
            </div>
        </dialog>
    )
}

export default ResumeEditorDeleteConfirm;