import { Routes, Route } from "react-router-dom";
// Routes
import Home from "pages/Home/HomePage";
import Authentication from "pages/Authentication/AuthenticationPage";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="login" element={<Authentication />} />
    </Routes>
  );
}

export default App;
