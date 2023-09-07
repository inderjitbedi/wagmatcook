import { ToastContainer } from 'react-toastify';
import './App.scss';
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
