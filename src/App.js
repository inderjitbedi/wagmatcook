import { ToastContainer } from 'react-toastify';
import './App.scss';
import ScrollToTop from './features/auth/pages/scrollTop';
import Navigation from "./navigation";

function App() {
  document.title = 'Wagmatcook';

  return (
    <>
      <Navigation></Navigation>
      <ToastContainer autoClose={2000} />
      </>
  );
}



export default App;
