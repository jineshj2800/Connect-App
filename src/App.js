import './App.css';
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/Login';
import { useStateValue } from './StateProvider';

function App() {
  const [{user}, dispatch] = useStateValue();
  return (
    // BEM naming convention
    <div className="app">
      {
        !user? (
          <Login/>
        ):
        (
          <div className="app_body">
            <Router>
              <Sidebar/>
              <Routes>
                <Route path="/:groupId" element={<Chat/>}/>
              </Routes>
            </Router>
          </div>
        )
        }
    </div>
  );
}

export default App;
