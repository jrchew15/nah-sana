import LogoutButton from "../auth/LogoutButton"
import UpdateWorkspace from "./UpdateWorkSpace"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import { oneWorkspace, removeUserFromWorkspace } from "../../store/workspace";
import AddUser from "./AddUser";
import GetProjects from "../Projects/ProjectsList";
import TaskList from "../Tasks/TasksList";
import TaskDetail from "../Tasks/TaskDetail";
import './GetOne.css'
export default function GetOne({ workspaceId }) {

    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)
    const { id } = useParams()

    const workspace = useSelector(state => state.workspace)
    const user = useSelector(state => state.session.user)
    console.log(user.image)
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
                    <div className="left-corner">Home</div>
                    <div className="dashboard-titles">
                        <h5>{current}</h5>
                        <div>
                            <div className="welcome">Welcome {user.firstName}!</div>
                        </div>
                        <div>
                            <h3> Workspace: {workspace.workspace.name}</h3>
                        </div>
                    </div>
                    <div className="top-widgets">
                        <div className="left-widget">
                            <div className="task-container">
                                <div className="task-title">
                                    <img className="profile-pic" src='https://images.pexels.com/photos/5969628/pexels-photo-5969628.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load' alt={user.firstName}></img>
                                    <h3 className="task-words">My Priorities</h3>
                                </div>
                                <div className="task-div">
                                    <TaskList />
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
                            <div className="user-list">
                                {Object.values(workspace.users).map(user => (
                                    <>
                                        <div className="user-card">
                                            <img className="user-card-image" src='https://images.pexels.com/photos/5225398/pexels-photo-5225398.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' alt={user.firstName}></img>
                                            <div key={user.id}>{user.firstName} {user.lastName}</div>
                                            <div style={{ textAlign: 'center', fontSize: '13px', color: '#aeadad' }}>Assgin a task to start collaborating</div>
                                            <div>
                                                <button className="delete-button" onClick={() => deleteUser(user.id)} >Remove User</button>
                                            </div>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <UpdateWorkspace />
                        <AddUser />
                        <LogoutButton />
                        <button onClick={handlepush}>Back to workspaces</button>
                    </div>
                </div>
            )}
        </>
    ) : null
}
