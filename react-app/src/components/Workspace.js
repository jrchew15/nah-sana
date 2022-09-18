import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import LogoutButton from './auth/LogoutButton';

export default function Workspace() {
    const dispatch = useDispatch();
    const match = useRouteMatch();

    const [workspaceLoaded, setWorkspaceLoaded] = useState(null)
    // const workspace = useSelector(state => state.workspace)
    const [navDisplay, setNavDisplay] = useState(true)
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
            // dispatch(actionLoadWorkspace(loadedWorkspace.workspace))
            // dispatch(actionLoadProjects(loadedWorkspace.projects))
            // dispatch(actionLoadUsers(loadedWorkspace.users))
            // dispatch(actionLoadTasks(loadedWorkspace.tasks))
        })()
    }, [dispatch])

    function toggleNavbarDisplay() {
        setNavDisplay(state => !state)
    }

    return workspaceLoaded ? (
        <>
            <div id='topbar'>
                <i class="fas fa-bars" onClick={toggleNavbarDisplay} />
            </div>
            <div id='navbar-and-content'>
                <div id='navbar' style={{ display: navDisplay ? 'flex' : 'none' }}></div>
                <div id='content'>
                    <>
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
                        <LogoutButton />
                    </>
                </div>
            </div>
        </>
    ) : null
}
