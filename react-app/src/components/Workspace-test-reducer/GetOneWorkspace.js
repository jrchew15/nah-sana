import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { oneWorkspace, removeUserFromWorkspace } from "../../store/workspace";
import GetProjects from "../Projects/ProjectsList";
import TasksListByUser from "../Tasks/TasksListByUser";
import TaskDetail from "../Tasks/TaskDetail";
import './GetOne.css';
import AddUserToWorkspace from "./AddUserModal";

export default function GetOne({ workspaceId }) {

    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)
    const { id } = useParams()

    const workspace = useSelector(state => state.workspace)
    const user = useSelector(state => state.session.user)
    // console.log(user.image)
    const current = new Date().toDateString()
    // const date = new Date().toLocaleDateString();
    // const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`


    useEffect(() => {
        dispatch(oneWorkspace(id)).then(() => setIsLoaded(true))
    }, [dispatch, id])
    const handlepush = (e) => {
        e.preventDefault()
        history.push('/workspaces')
    }
    const deleteUser = userid => {
        console.log(userid, '------------')
        dispatch(removeUserFromWorkspace(id, userid))
    }

    return isLoaded ? (

        <>
            {(isLoaded &&
                <div className="dashboard-container">
                    {/* <button onClick={handlepush}>Back to workspaces</button> */}
                    <div className="left-corner">Home</div>
                    <div className="dashboard-titles">
                        <h5 style={{ fontWeight: '500', }}>{current}</h5>
                        <div>
                            <div className="welcome">Welcome {user.firstName}!</div>
                        </div>
                        <div>
                            <h3 style={{ fontWeight: '500', }}> Workspace: {workspace.workspace.name}</h3>
                        </div>
                    </div>
                    <div className="top-widgets">
                        <div className="left-widget">
                            <div className="task-container">
                                <div className="task-title">
                                    <img className="profile-pic" src={user.image} alt={user.firstName}></img>
                                    <h3 className="task-words">My Priorities</h3>
                                </div>
                                <div className="task-div">
                                    <TasksListByUser />
                                    {/* <h1>Hi</h1> */}
                                </div>
                            </div>
                        </div>
                        <div className="right-widget">
                            {/* <div className="wrapper"> */}
                            <GetProjects workspaceId={workspaceId} />
                            {/* </div> */}
                        </div>
                    </div>
                    <div className="bottom-container">
                        <div className="bottom-widgets">
                            <h3 className="task-words">People</h3>
                            <div className="user-list ">
                                {Object.values(workspace.users).map(user => (
                                    <>
                                        <div>

                                            <div className="user-card">
                                                <NavLink className='nav-to-users' to={`/workspaces/${workspaceId}/user/${user.id}`}>
                                                    <img className="user-card-image" src={user.image} alt={user.firstName}></img>
                                                    <div className="user-name-link" key={user.id}>{user.firstName} {user.lastName}</div>
                                                </NavLink>
                                                <div style={{ textAlign: 'center', fontSize: '13px', color: '#aeadad' }}>Assgin a task to start collaborating</div>
                                                <div>
                                                    <button className="delete-button" onClick={() => deleteUser(user.id)} >Remove User</button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ))}
                            </div>
                            {/* <NavLink to={`/workspaces/${workspace.workspace.id}/users/${currentUser.id}`} exact>
                                <i className="far fa-check-circle" />
                                My Tasks
                            </NavLink> */}
                        </div>
                    </div>
                </div>
            )}
        </>
    ) : null
}
