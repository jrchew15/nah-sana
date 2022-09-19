import LogoutButton from "../auth/LogoutButton"
import UpdateWorkspace from "./UpdateWorkSpace"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";

import { oneWorkspace } from "../../store/workspace";
import AddUser from "./AddUser";
export default function GetOne() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)
    const { id } = useParams()

    const workspace = useSelector(state => state.workspace)
    // console.log('--------------------', workspace.users)
    // const users = workspace.users
    // console.log('----users-----', users['1'])
    // console.log(Object.values(users))
    useEffect(() => {
        dispatch(oneWorkspace(id)).then(() => setIsLoaded(true))
    }, [dispatch, id])
    const handlepush = (e) => {
        e.preventDefault()
        history.push('/workspaces')

    }
    // console.log('--------------------', Object.values(workspace.users))

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
                                {
                                    Object.values(
                                        workspace.users).map(user => (
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
                    <UpdateWorkspace />
                    <AddUser />
                    <LogoutButton />
                    <button onClick={handlepush}>Back to workspaces</button>
                </div>
            )}
        </>
    ) : null
}
