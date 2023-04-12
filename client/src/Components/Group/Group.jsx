const Group = ({name, groupLeader,  groupMembers}) => {
    return (
        <div className="group-container">
            <p>{name}</p>
            <p>{groupLeader}</p>
            <ul>
                {groupMembers.map((member, i) => {
                    <li key={i}>{member}</li>
                })}
            </ul>
        </div>
    )
}

export default Group;