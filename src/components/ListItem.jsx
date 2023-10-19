function ListItem(props) {
    return (
        <div className="listitem">
            <div className="col1">
                <div className="name">{props.map.name}</div>
                <div className="title"><i>{props.map.title}</i></div>
            </div>
            <div className="col2">
                {props.map.location ? <div className="location">{props.map.location}</div> : null}
                <div className="date"><i>{props.map.datestart} - {props.map.dateend}</i></div>
            </div>
            {props.map.description ? <div className="description">{props.map.description}</div> : null}
        </div>
    );
}

export default ListItem;