//remove the default browser router and add the outlet component from react-router-dom to render the child routes
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="container">
      <Navbar />
      <main>
        <Outlet /> {/* Renders child routes */}
      </main>
    </div>
  );
}

export default App;
