import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ErrorMessage{
  title:  string,
  message:string
  
  }
}
function Notification(props:ErrorMessage) {
  const notify = () => toast.error(props.message); // Display an error toast for authentication error

  return (
    <div>
      <button onClick={notify}>{props.title}</button>
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
<ToastContainer />
    </div>
  );
}

export default Notification;
