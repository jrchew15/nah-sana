import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import Topbar from "./Navbars/Topbar";
import GetOne from "./Workspace-test-reducer/GetOneWorkspace";
import GetProjects from "./Projects/ProjectsList";
import ProjectDetail from "./Projects/ProjectDetail";
import { oneWorkspace } from "../store/workspace";
import AllWorkSpaces from "./Workspace-test-reducer/AllWorkspaces";
import LeftNavBar from "./Navbars/LeftNavBar";
import UserProfilePage from "./UserProfilePage";


export default function Workspace() {
    const dispatch = useDispatch();
    // routeMatch is used to choose isolate which workspace we are on
    const match = useRouteMatch();
    const workspaceId = match.params.id;
    const user = useSelector(state => state.session.user);

    const [userDropdownOpen, setUserDropdownOpen] = useState(false)
    const profileDropdownRef = useRef(null);

    const [createDropdownOpen, setCreateDropdownOpen] = useState(false)
    const createDropdownRef = useRef(null);

    const [workspaceCreateDropdownOpen, setWorkspaceCreateDropdownOpen] = useState(false)
    const workspaceCreateDropdownRef = useRef(null);

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

    function dropdownChecks(e) {
        if (profileDropdownRef && userDropdownOpen) {
            if (e.target !== profileDropdownRef.current) {
                setUserDropdownOpen(false)
            }
        }
        if (createDropdownOpen && createDropdownRef) {
            if (e.target !== createDropdownRef.current) {
                setCreateDropdownOpen(false)
            }
        }
        if (workspaceCreateDropdownOpen && workspaceCreateDropdownRef) {
            if (e.target !== workspaceCreateDropdownRef.current) {
                setWorkspaceCreateDropdownOpen(false)
            }
        }
    }

    return workspaceLoaded && user ? (
        <>
            <Topbar toggleNavbarDisplay={toggleNavbarDisplay} profileDropdownRef={profileDropdownRef} userDropdownOpen={userDropdownOpen} setUserDropdownOpen={setUserDropdownOpen} dropdownChecks={dropdownChecks} />
            <div id='navbar-and-content' onClick={dropdownChecks}>
                <div id='navbar' style={{ display: navDisplay ? 'flex' : 'none' }}>
                    <LeftNavBar
                        workspaceCreateDropdownRef={workspaceCreateDropdownRef} workspaceCreateDropdownOpen={workspaceCreateDropdownOpen} setWorkspaceCreateDropdownOpen={setWorkspaceCreateDropdownOpen}
                        createDropdownRef={createDropdownRef} createDropdownOpen={createDropdownOpen} setCreateDropdownOpen={setCreateDropdownOpen}
                    />
                </div>
                <div id='content'>
                    <Switch>
                        <Route path='/workspaces/:id' exact>
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
                    </Switch>
                </div>
            </div>
        </>
    ) : null
}
