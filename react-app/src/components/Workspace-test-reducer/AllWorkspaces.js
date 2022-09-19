import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { workspaceGet } from "../../store/workspace";


export default function AllWorkSpaces() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)

    const workspaces = useSelector(state => state.workspace)
    // console.log(workspaces)
    const workspace = Object.values(workspaces)
    useEffect(() => {
        dispatch(workspaceGet()).then(() => setIsLoaded(true))
    }, [dispatch])

    return isLoaded ? (
        <div>
            Workspaces:
            <ul>
                {workspace.map(wk => (
                    <li key={wk.id}>
                        <NavLink to={`/workspaces/${wk.id}`} key={wk.id}>{wk.name}</NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
        : null
}
