import LogoutButton from "../auth/LogoutButton"
import UpdateWorkspace from "./UpdateWorkSpace"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";

import { oneWorkspace } from "../../store/workspace";
export default function GetOne() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const { id } = useParams()

    const workspace = useSelector(state => state.workspace)
    useEffect(() => {
        dispatch(oneWorkspace(id)).then(() => setIsLoaded(true))
    }, [dispatch, id])


    return isLoaded ? (

        <>
            {(workspace.workspace.name && isLoaded &&
                <div>

                    <ul>
                        <li>
                            <ul>Workspace :
                                <li>{workspace.workspace.name}</li>
                            </ul>
                        </li>
                        <li>
                            <ul>Projects:
                                {workspace.projects.map(project => (
                                    <li key={project.id}>{project.name}</li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <ul>Users:
                                {workspace.users.map(user => (
                                    <li key={user.id}>{user.firstName} {user.lastName}</li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <ul>Tasks:
                                {workspace.tasks.map(task => (
                                    <li key={task.id}>{task.name}</li>
                                ))}
                            </ul>
                        </li>
                    </ul>
                    <UpdateWorkspace workspace={workspace} />
                    <LogoutButton />
                </div>
            )}
        </>
    ) : null
}
