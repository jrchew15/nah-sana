import { useSelector } from "react-redux"
import { useRouteMatch } from "react-router-dom"

import './styles/topbar.css'

export default function Topbar({ toggleNavbarDisplay }) {
    const currentUser = useSelector(state => state.session.user);
    const match = useRouteMatch();
    let workspaceId = match.url.split('workspaces/')[1][0];
    console.log(workspaceId)
    return (
        <>
            <div id='topbar'>
                <i className="fas fa-bars" onClick={toggleNavbarDisplay} />
                <div className="userIcon">{currentUser.firstName[0].toUpperCase()}{currentUser.lastName[0].toUpperCase()}</div>
            </div>
            <div id='profile-dropdown'>
                <ul id='workspaces'>
                    {currentUser.workspaces.map(workspace => (
                        <li key={workspace.id} className={workspace.id == workspaceId ? 'active_workspace' : ''}>
                            {workspace.name}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
