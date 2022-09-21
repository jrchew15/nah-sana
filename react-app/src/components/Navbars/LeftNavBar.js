import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"

import './leftbar.css';

export default function LeftNavBar() {
    const workspace = useSelector(state => state.workspace);
    const currentUser = useSelector(state => state.session.user);
    return (workspace && currentUser && workspace.workspace ? <>
        <div id='left-nav-bar'>
            <div id='add-any'>
                <span>
                    <i className="fas fa-plus" />Create
                </span>
            </div>
            <div id='user-main-links'>
                <NavLink to={`/workspaces/${workspace.workspace.id}`} exact>
                    <i className="fas fa-home" />Home
                </NavLink>
                <NavLink to={`/workspaces/${workspace.workspace.id}/users/${currentUser.id}`} exact>
                    <i className="far fa-check-circle" />
                    My Tasks
                </NavLink>
            </div>
            <div className='horizontal-separator' />
            <div id='this-workspace-links'>
                <span id='workspace-name'>{workspace.workspace.name} <i className="fas fa-plus" /></span>
                <div id='user-circles'>
                    {/* users map */}
                </div>
                <ul id='left-nav-projects-list'>
                    {/* projects map */}
                </ul>
            </div>
            <div className='horizontal-separator' />
            <div id='extra-space' />
            <div className='horizontal-separator' />
            <div>Invite Teammates</div>
        </div>
        <div id='create-dropdown' className="left-dropdowns">
            <span>
                <i className="far fa-check-circle" /><span>Tasks</span>
            </span>
            <span>
                <i className="fas fa-clipboard-list" /><span>Projects</span>
            </span>
            <span>
                <i className="fas fa-user-plus" /><span>Invite</span>
            </span>
        </div>
        <div id='create-dropdown-workspace' className="left-dropdowns">
            <span>
                <i className="fas fa-clipboard-list" /><span>Create Project</span>
            </span>
            <span>
                <i className="fas fa-user-plus" /><span>Invite people</span>
            </span>
        </div>
    </> : null)

}
