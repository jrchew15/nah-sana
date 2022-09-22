import { NavLink, useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from "react";
import UserIcon, { ProjectLi } from "../UserIcon";
import { NavAddUserModal, NavDropdownAddUserModal, NavTaskModal, NavProjectForm } from "./NavModals";

import './leftbar.css';


export default function LeftNavBar() {
    const workspace = useSelector(state => state.workspace);
    const currentUser = useSelector(state => state.session.user);
    const history = useHistory();

    const [showAddAny, setShowAddAny] = useState(false)
    const [showAddToWorkspace, setShowAddToWorkspace] = useState(false)

    function redirectToProfile(userId) {
        history.push(`/workspaces/${workspace.workspace.id}/user/${userId}/list`)
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
                    <NavLink to={`/workspaces/${workspace.workspace.id}/user/${currentUser.id}`} exact>
                        <i className="far fa-check-circle" />
                        My Tasks
                    </NavLink>
                </div>
                <div className='horizontal-separator' style={{ margin: "10px 0" }} />
                <div id='this-workspace-links'>
                    <span id='workspace-name'>
                        {workspace.workspace.name}
                        <i className="fas fa-plus" onClick={() => setShowAddToWorkspace(val => !val)} />
                    </span>
                    <div id='user-circles'>
                        {Object.values(workspace.users).map(user => (
                            <UserIcon user={user} clickHandler={() => redirectToProfile(user.id)} />
                        )
                        )}
                    </div>
                    <ul id='left-nav-projects-list'>
                        {
                            workspace.projects.map(project => (
                                <ProjectLi project={project} clickHandler={() => redirectToProject(project.id)} />
                            ))
                        }
                    </ul>
                </div>
                <div className='horizontal-separator' style={{ margin: "10px 0" }} />
                <div id='extra-space' />
                <div className='horizontal-separator' style={{ margin: "10px 0" }} />
                <div style={{ marginBottom: 10 }}>
                    <NavAddUserModal />
                </div>
            </div>
            <div id='create-dropdown' className="left-dropdowns" style={{ display: showAddAny ? 'flex' : 'none' }}>
                <NavTaskModal handleClick={() => setShowAddAny(false)} />
                <NavProjectForm handleClick={() => setShowAddAny(false)} />
                <NavDropdownAddUserModal handleClick={() => setShowAddAny(false)} />
            </div>
            <div id='create-dropdown-workspace' className="left-dropdowns" style={{ display: showAddToWorkspace ? 'flex' : 'none' }}>
                <NavProjectForm handleClick={() => setShowAddToWorkspace(false)} />
                <NavDropdownAddUserModal handleClick={() => setShowAddToWorkspace(false)} />
            </div>
        </>) : null
    )

}
