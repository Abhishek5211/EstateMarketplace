import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute() {
    const {user} = useSelector((state:RootState ) => state.user);
    return (user.currentUser ? <Outlet/> : <Navigate to= '/signin' />);
}

export default PrivateRoute