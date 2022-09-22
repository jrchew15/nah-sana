import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch, NavLink, useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout } from "../../store/session";
import EditUserFormModal from "../EditUserModal";
import CreateWorkspaceModal from "../Workspace-test-reducer/CreateWorkspaceModal";
import UpdateWorkspaceModal from "../Workspace-test-reducer/UpdateWorkspaceModal";
import UserIcon from "../UserIcon";

import './topbar.css'

export default function Topbar({ toggleNavbarDisplay }) {
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


    {/* comment this out */ }

    // const { id } = useParams()
    // const handlepush = (e) => {
    //     e.preventDefault()
    //     history.push(`/workspaces/${id}`)
    // }

    return currentWorkspace && currentUser ? (
        <>
            <div id='topbar'>
                <i className="fas fa-bars" onClick={toggleNavbarDisplay} />
                <UserIcon user={currentUser} clickHandler={toggleUserDropdown} />
            </div>
            <div id='profile-dropdown' style={{ display: dropdownOpen ? 'flex' : 'none' }}>
                <div id='workspaces'>
                    {currentUser.workspaces.map(workspace => (
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
                    <NavLink to={`/workspaces/${currentWorkspace.id}/user/${currentUser.id}/lists`}>My Profile</NavLink>
                    <EditUserFormModal toggleUserDropdown={toggleUserDropdown} />
                    <span className="logout" onClick={onLogout}>Log Out</span>
                </div>
            </div>
        </>
    ) : null
}
