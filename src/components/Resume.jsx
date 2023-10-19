import ResumeHeader from "./ResumeHeader";
import ResumeListHeader from "./ResumeListHeader";

function Resume(props) {
    return (
        <div className="resume-container">
            <ResumeHeader header={props.header} />
            <div className="resume-body">
            {props.body ? props.body.map((map) => {
                return <ResumeListHeader key={map.key} map={map} />
            }) : null}
            </div>
        </div>
    );
}

export default Resume;