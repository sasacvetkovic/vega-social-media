import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "contexts/user.context";

// Routes
import Home from "pages/Home/HomePage";
import Authentication from "pages/Authentication/AuthenticationPage";
//Utils
import PrivateRoutes from "utils/router/privateRoutes";

function App() {
  const { currentUser } = useContext(UserContext);
  return (
    <Routes>
      <Route element={<PrivateRoutes currentUser={currentUser} />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="login" element={<Authentication />} />
    </Routes>
  );
}

export default App;
