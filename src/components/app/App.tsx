import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import NotFoundScreen from '../not-found-screen/Not-found-screen';
import LoadingScreen from '../loading-screen/Loading-screen';
import {useSelector} from 'react-redux';
import {getAuthorizationStatus, getIsDataLoaded} from '../../store/user-data/selectors';
import SignIn from '../sign-in/Sign-in';
import PrivateRoute from '../private-route/Private-route';
import Main from '../main/Main';
import SignUp from '../sign-up/Sign-up';

const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

function App(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const isDataLoaded = useSelector(getIsDataLoaded);

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute
          exact
          path={AppRoute.Root}
          render={() => <Main />}
        >
        </PrivateRoute>
        <Route exact path={AppRoute.SignIn} component={SignIn}/>
        <Route exact path={AppRoute.SignUp} component={SignUp}/>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
