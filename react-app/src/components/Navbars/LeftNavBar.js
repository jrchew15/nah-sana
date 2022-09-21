import { NavLink, useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from "react";

import './leftbar.css';


export default function LeftNavBar() {
    const workspace = useSelector(state => state.workspace);
    const currentUser = useSelector(state => state.session.user);
    const history = useHistory();

    const [showAddAny, setShowAddAny] = useState(false)
    const [showAddToWorkspace, setShowAddToWorkspace] = useState(false)

    function redirectToProfile(userId) {
        history.push(`/workspaces/${workspace.workspace.id}/users/${userId}`)
    }
    function redirectToProject(projectId) {
        history.push(`/workspaces/${workspace.workspace.id}/projects/${projectId}`)
    }

    return (workspace && currentUser && workspace.workspace ? (
        <>
            <div id='left-nav-bar'>
                <div id='add-any'>
                    <span onClick={() => setShowAddAny(val => !val)}>
                        <i className="fas fa-plus" /> Create
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
                    <span id='workspace-name'>
                        {workspace.workspace.name}
                        <i className="fas fa-plus" onClick={() => setShowAddToWorkspace(val => !val)} />
                    </span>
                    <div id='user-circles'>
                        {Object.values(workspace.users).map(user => (
                            <div className="userIcon" key={user.id} onClick={() => redirectToProfile(user.id)}>
                                {user.firstName[0].toUpperCase()}{user.lastName[0].toUpperCase()}
                            </div>
                        )
                        )}
                    </div>
                    <ul id='left-nav-projects-list'>
                        {
                            workspace.projects.map(project => (
                                <li key={project.id} onClick={() => redirectToProject(project.id)}>
                                    {project.name}
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className='horizontal-separator' />
                <div id='extra-space' />
                <div className='horizontal-separator' />
                <div>Invite Teammates</div>
            </div>
            <div id='create-dropdown' className="left-dropdowns" style={{ display: showAddAny ? 'flex' : 'none' }}>
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
            <div id='create-dropdown-workspace' className="left-dropdowns" style={{ display: showAddToWorkspace ? 'flex' : 'none' }}>
                <span>
                    <i className="fas fa-clipboard-list" /><span>Create Project</span>
                </span>
                <span>
                    <i className="fas fa-user-plus" /><span>Invite people</span>
                </span>
            </div>
        </>) : null
    )

}
