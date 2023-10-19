import ListItem from "./ListItem"

function ResumeList(props) {
    return (
        <div className="listitem-container">
            {props.list.map((l) => {
                return <ListItem key={l.key} map={l} />
            })}
        </div>
    );
}

export default ResumeList;