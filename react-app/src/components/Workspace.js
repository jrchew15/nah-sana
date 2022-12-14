import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch, Switch, Route, useHistory } from "react-router-dom";
import Topbar from "./Navbars/Topbar";
import GetOne from "./Workspace-test-reducer/GetOneWorkspace";
import GetProjects from "./Projects/ProjectsList";
import ProjectDetail from "./Projects/ProjectDetail";
import { oneWorkspace } from "../store/workspace";
import LeftNavBar from "./Navbars/LeftNavBar";
import UserProfilePage from "./UserProfilePage";
import { DropdownHandlingContext } from "../context/DropdownHandlingContext";


export default function Workspace() {
    const dispatch = useDispatch();
    const history = useHistory();
    // routeMatch is used to choose isolate which workspace we are on
    const match = useRouteMatch();
    const workspaceId = match.params.id;
    const user = useSelector(state => state.session.user);

    const [workspaceLoaded, setWorkspaceLoaded] = useState(false);
    const [workspaceNotFound, setWorkspaceNotFound] = useState(false);

    const [navDisplay, setNavDisplay] = useState(true)

    useEffect(() => {
        (async () => {
            const res = await dispatch(oneWorkspace(workspaceId))
            if (!res) {
                setWorkspaceNotFound(true)
            }
            setWorkspaceLoaded(true)
        })()
    }, [dispatch, user, workspaceId, oneWorkspace, setWorkspaceLoaded])

    function toggleNavbarDisplay() {
        setNavDisplay(state => !state)
    }

    const context = useContext(DropdownHandlingContext);
    const { dropdownChecks } = context;

    if (!workspaceLoaded) return null

    function redirect() {
        setTimeout(() => { history.push(`/`) }, 1000)
    }

    if (user && !user.workspaces.some(ele => ele.id === +workspaceId)) {
        redirect()
        return (
            <div>
                <h1 className='projectDoesNotExist'>You do not have access to this workspace...redirecting</h1>
            </div>
        )
    }

    if (workspaceNotFound) {
        redirect()
        return (
            <div>
                <h1 className='projectDoesNotExist'>Workspace doesn't exist...redirecting</h1>
            </div>
        )
    }

    return workspaceLoaded && user ? (
        <>
            <Topbar toggleNavbarDisplay={toggleNavbarDisplay} />
            <div id='navbar-and-content' onClick={dropdownChecks}>
                <div id='navbar' style={{ display: navDisplay ? 'flex' : 'none' }}>
                    <LeftNavBar />
                </div>
                <div id='content'>
                    <Switch>
                        <Route exact path='/workspaces/:id'>
                            <GetOne workspaceId={workspaceId} />
                        </Route>
                        <Route exact path='/workspaces/:workspaceId/user/:id'>
                            <UserProfilePage workspaceId={workspaceId} />
                        </Route>
                        <Route exact path='/workspaces/:workspaceId/user/:id/list'>
                            <UserProfilePage workspaceId={workspaceId} />
                        </Route>
                        <Route exact path='/workspaces/:id/projects'>
                            <GetProjects workspaceId={workspaceId} />
                        </Route>
                        <Route exact path='/workspaces/:workspaceId/projects/:id'>
                            <ProjectDetail workspaceId={workspaceId} />
                        </Route>
                        <Route exact path='/workspaces/:workspaceId/projects/:id/list'>
                            <ProjectDetail workspaceId={workspaceId} />
                        </Route>
                        <Route>
                            <GetOne workspaceId={workspaceId} />
                        </Route>
                    </Switch>
                </div>
            </div>
        </>
    ) : null
}
