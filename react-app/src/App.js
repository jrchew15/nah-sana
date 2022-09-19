import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import TaskList from './components/Tasks/TasksList';
import User from './components/User';
import { authenticate } from './store/session';
import TaskDetail from './components/Tasks/TaskDetail';

import Workspace from './components/Workspace';
import Depricated_App from './Depricated_App';
import AllWorkSpaces from './components/Workspace-test-reducer/AllWorkspaces';
import CreateWorkspace from './components/Workspace-test-reducer/CreateWS'

import GetProjects from './components/Projects/ProjectsList';
import ProjectDetail from './components/Projects/ProjectDetail';
import CreateProjectModal from './components/Projects/CreateProjectModal';
import LoginForm from './components/auth/LoginForm';
import EditUserFormModal from './components/EditUserModal';
import SignUpForm from './components/auth/SignUpForm';

export default function App() {
    const [currentUserIsLoaded, setCurrentUserIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);

    useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            setCurrentUserIsLoaded(true);
        })();
    }, [dispatch]);


    // useEffect(() => {
    //     if (currentUser) {
    //         if (currentUser.Workspaces.length) {
    //             // If there is a current user that is on a workspace,
    //             // then redirect them to their 0 index workspace
    //         }
    //         // If the user isn't on a workspace, suggest they create one
    // maybe add a 'demo workspace' button that adds the current user to a default workspace
    // with some seeded data

    //         return // workspace form here
    //     }
    // }, [currentUser, currentUserIsLoaded])

    if (!currentUserIsLoaded) return null;

    const Home = () => {
        if (currentUser) {
            return currentUser.workspaces.length ?
                <Redirect to={`/workspaces/${currentUser.workspaces[0].id}`} /> :
                <CreateWorkspace />
        }
        return (
            <>
                <h1>Splash Page</h1>
                <LoginForm />
                <h2>Sign Up</h2>
                <SignUpForm />
              </>
        )
          }


    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact={true}>
                    <Home />
                </Route>
                <Route path='/workspaces/:id'>
          <>
            <Workspace />
          </>
        </Route>
        <Route path='/workspaces'>
           <AllWorkSpaces />
           <CreateWorkspace />
        </Route>
        <Route exact path='/projects/:id'>
          <ProjectDetail />
        </Route>
        <Route exact path='/projects'>
          <GetProjects />
          <CreateProjectModal />
          <EditUserFormModal />
        </Route>
            </Switch>
        </BrowserRouter>
    )
}
