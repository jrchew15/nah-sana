import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";

export default function Workspace() {
    const dispatch = useDispatch();
    const match = useRouteMatch();

    const [workspaceLoaded, setWorkspaceLoaded] = useState(null)
    // const workspace = useSelector(state => state.workspace)

    // for testing only:
    const [workspace, setWorkspace] = useState(null)

    useEffect(() => {
        (async () => {
            const response = await fetch(
                `/api/workspaces/${match.params.id}`
            )
            const loadedWorkspace = await response.json()
            // console.log(loadedWorkspace)
            setWorkspace(loadedWorkspace)
            setWorkspaceLoaded(true)
            // dispatch(actionLoadProjects(loadedWorkspace.projects))
            // dispatch(actionLoadUsers(loadedWorkspace.users))
            // dispatch(actionLoadTasks(loadedWorkspace.tasks))
        })()
    }, [dispatch])

    return workspaceLoaded ? (
        <ul>
            <li>
                <ul>Projects:
                    {workspace.projects.map(project => (
                        <li>{project.name}</li>
                    ))}
                </ul>
            </li>
            <li>
                <ul>Users:
                    {workspace.users.map(user => (
                        <li>{user.firstName} {user.lastName}</li>
                    ))}
                </ul>
            </li>
            <li>
                <ul>Tasks:
                    {workspace.tasks.map(task => (
                        <li>{task.name}</li>
                    ))}
                </ul>
            </li>
        </ul>
    ) : null
}
