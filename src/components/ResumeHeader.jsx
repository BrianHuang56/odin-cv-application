import "../styles/ResumeHeader.css";


function ResumeHeader(props) {
    return (
        <div className="header-container">
            <div className="resume-name">{props.header.name}</div>
            <div className="resume-info">
                <span className="phone">{props.header.phone}</span>
                <span className="email">{props.header.email}</span>
                <span className="location">{props.header.location}</span>
            </div>
        </div>
    );
}

export default ResumeHeader;