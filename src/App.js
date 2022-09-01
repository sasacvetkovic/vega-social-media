import { Routes, Route } from "react-router-dom";

// Routes
import Home from "pages/Home/HomePage";
import Authentication from "pages/Authentication/AuthenticationPage";
import SettingsPage from "pages/Settings/SettingsPage";
//Utils
import PrivateRoutes from "utils/router/privateRoutes";

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route index element={<Home />} />
        <Route path="test" element={<SettingsPage />} />
      </Route>
      <Route path="login" element={<Authentication />} />
    </Routes>
  );
}

export default App;
