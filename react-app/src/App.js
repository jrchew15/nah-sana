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
import NavBar from './components/NavBar';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import TaskForm from './components/Tasks/TaskForm';

export default function App() {
  let dispatch = useDispatch()
  let [loaded, setLoaded] = useState()

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
        <Route exact path='/tasks/new'>
          <TaskForm />
        </Route>
        <Route exact path='/tasks/:taskId'>
          <TaskDetail />
        </Route>
        <Route exact path='/tasks/:taskId/edit'>
          <TaskForm />
        </Route>
        <Route exact path='/tasks'>
          <TaskList />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
