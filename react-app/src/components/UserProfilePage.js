import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, NavLink, Route, Switch, useHistory } from "react-router-dom";
import TasksListUserProfile from "./Tasks/TasksListUserProfile";
import './UserProfilePage.css'

function UserProfilePage() {
  const history = useHistory()
  const [loaded, setLoaded] = useState(false)
  const { workspaceId, id } = useParams()
  const users = useSelector(state => state.workspace.users)
  let user;
  if (users) {
    user = users[id]
  }

  useEffect(() => {
    if (user) {
      setLoaded(true)
    }
  }, [user])


  function redirect() {
    setTimeout(() => { history.push(`/workspaces/${workspaceId}`) }, 1000)
  }


  if (!user) {
    return (
      <div>
        <h1 className='projectDoesNotExist'>User does not exist...redirecting</h1>
        {redirect()}
      </div>
    )
  }


  let overview = (
    <div className="profileInfoContainer">
      <div className="profileInfoLeftContent">
        <div>
          <h4 className="profileHeaders">About {user?.firstName}</h4>
          <div className="profileInfoBioContainer">
            <p className="profileInfoText" >
              {user?.bio ? user?.bio : "No Information Provided"}
            </p>
          </div>
        </div>
      </div>
      <div className="profileInfoRightContent">
        <div className="profileWidgetContainer">
          <div className="profileWidgetColor"></div>
          <h4 className="profileHeaders">Full Name</h4>
          <p className="profileInfoText">
            {user?.firstName} {user?.lastName}
          </p>
        </div>
        <div className="profileDivider"></div>
        <div className="profileWidgetContainer">
          <div className="profileWidgetColor"></div>
          <h4 className="profileHeaders">Pronouns</h4>
          <p className="profileInfoText">
            {user?.pronouns ? user?.pronouns : "No Information Provided"}
          </p>
        </div>
        <div className="profileDivider"></div>
        <div className="profileWidgetContainer">
          <div className="profileWidgetColor"></div>
          <h4 className="profileHeaders">Department</h4>
          <p className="profileInfoText">
            {user?.department ? user?.department : "No Information Provided"}
          </p>
        </div>
        <div className="profileDivider"></div>
        <div className="profileWidgetContainer">
          <div className="profileWidgetColor"></div>
          <h4 className="profileHeaders">Role</h4>
          <p className="profileInfoText">
            {user?.role ? user?.role : "No Information Provided"}
          </p>
        </div>
      </div>
    </div>
  )
  let props = { workspaceId, id }

  let list = (
    <div className='projectDetailTaskOuterContainer'>
      <TasksListUserProfile props={props} />
    </div>
  )

  return loaded && user ? (
    <div className='innerContent'>
      {/* NavBar */}
      <div className='profileNavBar'>
        <div className='profileNavBarImage'>
          <div className='profileImageContainer'>
            <img src={user?.image} alt="user" className='profileImage' />
          </div>

        </div>
        <div className='profileNavBarInfo'>
          <div className="profileName">
            {user?.firstName}'s Profile
          </div>
          <nav className='projectNavTabsContainer'>
            <div className='projectNavTabs'>
              <NavLink to={`/workspaces/${workspaceId}/user/${id}`} exact>Overview</NavLink>
            </div>
            <div className='projectNavTabsSpace'></div>
            <div className='projectNavTabs'>
              <NavLink to={`/workspaces/${workspaceId}/user/${id}/list`}>List</NavLink>
            </div>
          </nav>
        </div>
      </div>
      {/* Content */}
      <div className='profileDetailOuter'>
        <Switch>
          <Route exact path={`/workspaces/${workspaceId}/user/${id}`}>
            {overview}
          </Route>
          <Route exact path={`/workspaces/${workspaceId}/user/${id}/list`}>
            {list}
          </Route>
        </Switch>
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  )
}

export default UserProfilePage