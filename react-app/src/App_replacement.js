import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';

import Workspace from './components/Workspace';


function App() {
    const [currentUserIsLoaded, setCurrentUserIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    currentUser = useSelector(state => state.session.user);

    useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            setCurrentUserIsLoaded(true);
        })();
    }, [dispatch]);

    if (!currentUserIsLoaded) return null;

    if (currentUser) {
        if (currentUser.Workspaces.length) {
            // If there is a current user that is on a workspace,
            // then redirect them to their 0 index workspace
            workspaceUrl = `/workspaces/${currentUser.Workspaces[0].id}`
            history.push(workspaceUrl)
            return
        }
        // If the user isn't on a workspace, suggest they create one

        return // workspace form here
    }


    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact={true}>
                    {/* <SplashPage /> */}
                </Route>
                <Route path='/workspaces/:id'>
                    <Workspaces />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}
