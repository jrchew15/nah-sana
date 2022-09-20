import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from './store/session';
import TaskDetail from './components/Tasks/TaskDetail';

import Workspace from './components/Workspace';
import CreateWorkspace from './components/Workspace-test-reducer/CreateWS'

import Splashpage from './components/Splashpage';
import LoginPage from './components/auth/LoginPage';
import SignUpPage from './components/auth/SignUpPage';

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

  if (!currentUserIsLoaded) return null;


  const Home = () => {
        if (currentUser && currentUser.workspaces) {
            return currentUser.workspaces.length ?
                <Redirect to={`/workspaces/${currentUser.workspaces[0].id}`} /> :
                <CreateWorkspace />
        }
        return (
            <>
                <Splashpage />
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
        <Route exact path='/login'>
          <LoginPage />
        </Route>
        <Route exact path='/signup'>
          <SignUpPage />
        </Route>
        {/* <Route path='/workspaces'>
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
        </Route> */}
        <Route exact path='/tasks/:taskId/edit'>
          <TaskDetail />
        </Route>
        <Route exact path='/tasks/:taskId'>
          <TaskDetail />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

