import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import LogoutButton from './auth/LogoutButton';
import Topbar from "./Navbars/Topbar";
import DevOnlyContent from "./DevOnlyContent";
import GetOne from "./Workspace-test-reducer/GetOneWorkspace";
import GetProjects from "./Projects/ProjectsList";
import ProjectDetail from "./Projects/ProjectDetail";
import ProjectDetailList from "./Projects/ProjectDetailList";
import { oneWorkspace } from "../store/workspace";
import AllWorkSpaces from "./Workspace-test-reducer/AllWorkspaces";


export default function Workspace() {
    const dispatch = useDispatch();
    // routeMatch is used to choose isolate which workspace we are on
    const match = useRouteMatch();
    const workspaceId = match.params.id;
    const user = useSelector(state => state.session.user)

    const [workspaceLoaded, setWorkspaceLoaded] = useState(false)

    const [navDisplay, setNavDisplay] = useState(true)

    // this will be updated with a fetch containing all info
    // in the future, we may instead use useSelectors on all slices of state
    //    which are filled when fetch hydrates state
    // const [workspace, setWorkspace] = useState(null)

    useEffect(() => {
        dispatch(oneWorkspace(workspaceId))
        setWorkspaceLoaded(true)
    }, [dispatch, workspaceId])

    function toggleNavbarDisplay() {
        setNavDisplay(state => !state)
    }

    return workspaceLoaded && user ? (
        <>
            <Topbar toggleNavbarDisplay={toggleNavbarDisplay} />
            <div id='navbar-and-content'>
                <div id='navbar' style={{ display: navDisplay ? 'flex' : 'none' }}></div>
                <div id='content'>
                    <Switch>
                        <Route path='/workspaces/:id' exact>
                            <GetOne workspaceId={workspaceId} />
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
                    </Switch>
                </div>
            </div>
        </>
    ) : null
}
