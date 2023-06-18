import ReactDOM from 'react-dom/client';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import './stylesheets/index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from './components/App';
import PhotographersProfile from './pages/PhotographersProfile';
import Popular from './pages/Popular';
import UserOnboarding from './pages/UserOnboarding';
import Login from './pages/Login';
import Profile from './pages/Profile';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />
	},
	{
		path: '/photographer',
		element: <PhotographersProfile />
	},
	{
		path: '/popular',
		element: <Popular />
	},
	{
		path: '/onboarding',
		element: <UserOnboarding />
	},
	{
		path: '/login',
		element: <Login />
	},
	{
		path: '/profile',
		element: <Profile />
	}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<RouterProvider router={router} />
  );
  