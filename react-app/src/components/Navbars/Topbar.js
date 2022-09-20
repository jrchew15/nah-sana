import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch, NavLink, useHistory } from "react-router-dom";
import { useState } from "react";
import { logout } from "../../store/session";
import EditUserFormModal from "../EditUserModal";
import CreateWorkspaceModal from "../Workspace-test-reducer/CreateWorkspaceModal";
import UpdateWorkspaceModal from "../Workspace-test-reducer/UpdateWorkspaceModal";

import './topbar.css'

export default function Topbar({ toggleNavbarDisplay }) {
    const currentUserTaskListUrl = '/' // REVISIT

    const currentUser = useSelector(state => state.session.user);
    const currentWorkspace = useSelector(state => state.workspace.workspace);
    const dispatch = useDispatch();
    const history = useHistory();

    const [dropdownOpen, setDropdownOpen] = useState(false)
    const toggleUserDropdown = () => {
        setDropdownOpen(val => !val);
    }

    const onLogout = async (e) => {
        await dispatch(logout());
        history.push('/')
    };

    return currentWorkspace && currentUser ? (
        <>
            <div id='topbar'>
                <i className="fas fa-bars" onClick={toggleNavbarDisplay} />
                {/* this usericon is a placeholder */}
                <div className="userIcon" onClick={toggleUserDropdown}>{currentUser.firstName[0].toUpperCase()}{currentUser.lastName[0].toUpperCase()}</div>
            </div>
            <div id='profile-dropdown' style={{ display: dropdownOpen ? 'flex' : 'none' }}>
                <div id='workspaces'>
                    {currentUser.workspaces.map(workspace => (
                        // <NavLink key={workspace.id} to={`/workspaces/${workspace.id}`}>
                        //     {workspace.name}
                        // </NavLink>
                        <a key={workspace.id}
                            href={`/workspaces/${workspace.id}`}
                            target='_blank'
                            className={workspace.id == currentWorkspace.id ? 'active' : ''}>
                            {workspace.name}
                        </a>
                    ))}
                </div>

                <div className="horizontal-separator" />

                <div id="create-workspace-dropdown">
                    <CreateWorkspaceModal toggleUserDropdown={toggleUserDropdown} />
                    <UpdateWorkspaceModal toggleUserDropdown={toggleUserDropdown} />
                </div>

                <div className="horizontal-separator" />

                <div id="user-links">
                    <NavLink to={currentUserTaskListUrl}>My Profile</NavLink>
                    {/* <span>My Settings needs an onClick listener to display modal</span> */}
                    <EditUserFormModal toggleUserDropdown={toggleUserDropdown} />
                    <span className="logout" onClick={onLogout}>Log Out</span>
                </div>
            </div>
            { }
        </>
    ) : null
}
