import "../styles/ResumeHeader.css";


function ResumeHeader(props) {
    return (
        <div className="header-container">
            <div className="resume-name">{props.header.name}</div>
            <div className="resume-info">
                {props.header.email ? 
                    <div className="header-info-container">
                        <img src="./email.svg" height="20px"/>
                        <span className="email">{props.header.email}</span>
                    </div>: null}
                    {props.header.phone ? 
                    <div className="header-info-container">
                        <img src="./phone.svg" height="20px"/>
                        <span className="phone">{props.header.phone}</span>
                    </div>: null}
                    {props.header.location ? 
                    <div className="header-info-container">
                        <img src="./map-marker.svg" height="20px"/>
                        <span className="location">{props.header.location}</span>
                    </div>: null}
            </div>
        </div>
    );
}

export default ResumeHeader;