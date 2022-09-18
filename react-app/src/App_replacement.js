import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';

import Workspace from './components/Workspace';


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


    useEffect(() => {
        if (currentUser) {
            if (currentUser.Workspaces.length) {
                // If there is a current user that is on a workspace,
                // then redirect them to their 0 index workspace
                const workspaceUrl = `/workspaces/${currentUser.Workspaces[0].id}`;
                console.log('REDIRECT', workspaceUrl)
                return <Redirect to={workspaceUrl} />
            }
            // If the user isn't on a workspace, suggest they create one

            return // workspace form here
        }
    }, [currentUser, currentUserIsLoaded])

    if (!currentUserIsLoaded) return null;

    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact={true}>
                    {/* <SplashPage /> */}
                </Route>
                <Route path='/workspaces/:id'>
                    <Workspace />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}
