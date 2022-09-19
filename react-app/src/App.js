import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import LoginForm from './components/auth/LoginForm';

import Workspace from './components/Workspace';
import Depricated_App from './Depricated_App';

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
    // console.log('REDIRECT', workspaceUrl)


    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact={true}>
                    {
                        currentUser ?
                            <Redirect to={`/workspaces/${currentUser.workspaces[0].id}`} /> :
                            <>
                                <h1>Splash Page</h1>
                                <LoginForm />
                            </>
                    }
                </Route>
                <Route path='/workspaces/:id'>
                    <>
                        <Workspace />
                    </>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}
