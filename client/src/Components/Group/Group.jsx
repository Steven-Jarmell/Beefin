import { useParams } from "react-router-dom";

const Group = () => {
    const { id } = useParams();
    console.log(id);
    return (
        <h1>Group</h1>
    )
}

export default Group;