import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";

export default function Workspace() {
    const dispatch = useDispatch();
    const match = useRouteMatch();

    const [workspaceLoaded, setWorkspaceLoaded] = useState(null)
    const workspace = useSelector(state => state.workspace)

    useEffect(() => {
        (async () => {
            const loadedWorkspace = await fetch(
                `/api/workspaces/${match.path.split('/')[2]}`
            )
            setWorkspaceLoaded(true)
            // dispatch(actionLoadProjects(loadedWorkspace.projects))
            // dispatch(actionLoadUsers(loadedWorkspace.users))
            // dispatch(actionLoadTasks(loadedWorkspace.tasks))
        })()
    }, [dispatch])
}
