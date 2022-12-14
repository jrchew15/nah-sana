import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { oneWorkspace, removeUserFromWorkspace } from "../../store/workspace";
import { authenticate } from "../../store/session";
import GetProjects from "../Projects/ProjectsList";
import TasksListByUser from "../Tasks/TasksListByUser";
import './GetOne.css';

export default function GetOne({ workspaceId }) {

    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)
    const { id } = useParams()

    const workspace = useSelector(state => state.workspace)
    const currentUser = useSelector(state => state.session.user)

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
    const deleteUser = async userid => {
        await dispatch(removeUserFromWorkspace(id, userid))
        await dispatch(authenticate())
        if (currentUser.id === userid) {
            history.push('/')
        }
    }

    return isLoaded ? (

        <>
            {(isLoaded &&
                <div className="dashboard-container">
                    {/* <button onClick={handlepush}>Back to workspaces</button> */}
                    <div className="dashboard-titles">
                        <h5 style={{ fontWeight: '500', }}>{current}</h5>
                        <div>
                            <div className="welcome">Welcome {currentUser.firstName}!</div>
                        </div>
                        <div>
                            <h3 style={{ fontWeight: '500', }}>{workspace.workspace.name}</h3>
                        </div>
                    </div>
                    <div className="top-widgets">
                        <div className="left-widget">
                            <div className="task-container">
                                <div className="task-title">
                                    <img className="profile-pic" src={currentUser.image} alt={currentUser.firstName}></img>
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
                            {/* <h3 className='title-projects'>Projects</h3> */}
                            <GetProjects workspaceId={workspaceId} />
                            {/* </div> */}
                        </div>
                    </div>
                    <div className="bottom-container">
                        <div className="bottom-widgets">
                            <h3 className="task-words another-tag">People</h3>
                            <div className="user-list ">
                                {Object.values(workspace.users).map(user => (
                                    <>
                                        {/* <div> */}
                                        <div className="user-card">
                                            <NavLink className='nav-to-users' to={`/workspaces/${workspaceId}/user/${user.id}`}>
                                                <img className="user-card-image" src={user.image} alt={user.firstName}></img>
                                                <div className="user-name-link" key={user.id}>{user.firstName} {user.lastName}</div>
                                            </NavLink>
                                            <div style={{ textAlign: 'center', fontSize: '13px', color: '#aeadad' }}>Assgin a task to start collaborating</div>
                                            <div>
                                                {user.id === currentUser.id ? <div style={{ paddingTop: '40px', paddingBottom: '2px' }}>Owner</div> :

                                                    <button className="delete-button" onClick={() => deleteUser(user.id)} >Remove User</button>
                                                }
                                            </div>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    ) : null
}
