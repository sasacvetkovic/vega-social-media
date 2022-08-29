import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "contexts/user.context";

// Routes
import Home from "pages/Home/HomePage";
import Authentication from "pages/Authentication/AuthenticationPage";
//Utils
import PrivateRoutes from "utils/router/privateRoutes";
import {auth} from 'utils/firebase/firebase.utils'

function App() {
  const data = useContext(UserContext)
  console.log(auth, 'currentUser' in auth);

  console.log(auth.currentUser, 'sa current');
  console.log(data, 'cur');
  return (
    <Routes>
      <Route element={<PrivateRoutes currentUser={auth.currentUser}/>}>
        <Route index element={<Home />} />
      </Route>
      <Route path="login" element={<Authentication />} />
    </Routes>
  );
}

export default App;
