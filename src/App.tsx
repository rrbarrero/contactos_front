import './App.css';
import Landing from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { isAuthenticated } from './services/Auth';
import ProtectedRoute from './services/ProtectedRoute';
import UnProtectedRoute from './services/UnProtectedRoute';

function App() {

  const fallbackUri = `${isAuthenticated() ? '/dashboard' : '/login'}`;


  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <UnProtectedRoute path="/login" component={Landing} />
          <Redirect to={fallbackUri} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
