import ResumeList from "./ResumeList";
import "../styles/ResumeList.css";

function ResumeListHeader(props) {
    return (
        <div className="list-container">
            <div className="list-header">
                <i>{props.map.title}</i>
            </div>
            <ResumeList key={props.map.key} list={props.map.list} />
        </div>
    );
}

export default ResumeListHeader;