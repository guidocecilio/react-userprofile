import Base from './components/Base.jsx';
import HomePage from './components/HomePage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import EditProfilePage from './containers/EditProfilePage.jsx';
import AuthService from './modules/AuthService';
import ProfileDetailsPage from './containers/ProfileDetailsPage.jsx';

const routes = {
  // base component (wrapper for the whole application).
  component: Base,
  childRoutes: [
    {
      path: '/',
      getComponent: (location, callback) => {
        if (AuthService.isUserAuthenticated()) {
          callback(null, ProfileDetailsPage);
        } else {
          callback(null, LoginPage);
        }
      }
    },

    {
      path: '/login',
      component: LoginPage
    },

    {
      path: '/edit-profile',
      component: EditProfilePage
    },
    {
      path: '/view-profile',
      onEnter: AuthService.requireAuth,
      component: ProfileDetailsPage
    },
    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        AuthService.logout();
        replace('/'); 
      }
    }

  ]
};

export default routes;