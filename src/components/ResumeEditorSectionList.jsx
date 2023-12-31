import ResumeEditorForm from "./ResumeEditorForm";

function ResumeEditorSectionList(props) {
    const fadeIn = {animation: "subsecInAnimation 150ms ease-in"};
    return (
        <div style={fadeIn} className="edit-section">
            {!props.showForm ? 
                <button className="section-button" onClick={() => {
                    props.setSection(props.sectionInd);
                    props.setFormInd(props.ind);
                    props.setAddForm(-1);
                    }}>
                    {props.list.name}
                </button> :
                <ResumeEditorForm list={props.list} setForm={props.setFormInd} title={props.title} onChange={props.onChange} delete={props.delete} revert={props.revert} save={props.save}/>}
        </div>
    );
}

export default ResumeEditorSectionList;