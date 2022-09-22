import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from './store/session';
import { DropdownHandlingProvider } from './context/DropdownHandlingContext';

import Workspace from './components/Workspace';
import CreateWorkspace from './components/Workspace-test-reducer/CreateWorkspaceModal/CreateWS'

import Splashpage from './components/Splashpage';
import LoginPage from './components/auth/LoginPage';
import SignUpPage from './components/auth/SignUpPage';
import NewUserWorkspace from './components/NewUserCreateWS/NEW';

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
        <NewUserWorkspace />
    }
    else
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
          <DropdownHandlingProvider>
            <Workspace />
          </DropdownHandlingProvider>
        </Route>
        <Route exact path='/login'>
          <LoginPage />
        </Route>
        <Route exact path='/signup'>
          <SignUpPage />
        </Route>
        <Route>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
