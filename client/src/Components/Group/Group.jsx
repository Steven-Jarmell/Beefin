const Group = ({name, groupLeader,  groupMembers}) => {
    return (
        <div className="group-container">
            <p>Name: {name}</p>
            <p>Leader: {groupLeader}</p>
            Members:
            <ul>
                {groupMembers.map((member, i) => (
                    <li key={i}>{member}</li>
                ))}
            </ul>
        </div>
    )
}

export default Group;