import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { useContext } from "react";
import { logout } from "../../store/session";
import EditUserFormModal from "../EditUserModal";
import CreateWorkspaceModal from "../Workspace-test-reducer/CreateWorkspaceModal";
import UpdateWorkspaceModal from "../Workspace-test-reducer/UpdateWorkspaceModal";
import UserIcon from "../UserIcon";
import { DropdownHandlingContext } from "../../context/DropdownHandlingContext";

import './topbar.css'

export default function Topbar({ toggleNavbarDisplay }) {
    const currentUser = useSelector(state => state.session.user);
    const currentWorkspace = useSelector(state => state.workspace.workspace);
    const dispatch = useDispatch();
    const history = useHistory();

    const {
        userDropdownRef,
        userDropdownOpen,
        setUserDropdownOpen,
        dropdownChecks
    } = useContext(DropdownHandlingContext)

    const toggleUserDropdown = () => {
        setUserDropdownOpen(val => !val);
    }

    const onLogout = async (e) => {
        await dispatch(logout());
        history.push('/')
    };

    return currentWorkspace && currentUser ? (
        <>
            <div id='topbar' onClick={dropdownChecks}>
                <div className='splashpageLogoContainer'>
                    <i className="fas fa-bars" onClick={toggleNavbarDisplay} />
                    <img src="/static/images/logos/logo-dark.png" alt="logo" className='splashpageLogo' onClick={() => { history.push(`/workspaces/${currentWorkspace.id}`) }} style={{ cursor: 'pointer', height: 'calc(0.9 * var(--topbar-height))', width: 'calc(0.9 * var(--topbar-height))' }} />
                    <p className='unselectable' onClick={() => { history.push(`/workspaces/${currentWorkspace.id}`) }} style={{ cursor: 'pointer' }}>Nah-sana</p>
                </div>
                <UserIcon user={currentUser} clickHandler={toggleUserDropdown} />
            </div>
            <div id='profile-dropdown' ref={userDropdownRef} style={{ display: userDropdownOpen ? 'flex' : 'none' }}>
                <div id='workspaces'>
                    {currentUser.workspaces.map(workspace => (
                        <a key={workspace.id}
                            href={`/workspaces/${workspace.id}`}
                            target='_blank'
                            rel='noreferrer'
                            className={+workspace.id === +currentWorkspace.id ? 'active' : ''}>
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
                    <NavLink to={`/workspaces/${currentWorkspace.id}/user/${currentUser.id}/list`}>My Profile</NavLink>
                    <EditUserFormModal toggleUserDropdown={toggleUserDropdown} />
                    <span className="logout" onClick={onLogout}>Log Out</span>
                </div>
            </div>
        </>
    ) : null
}
