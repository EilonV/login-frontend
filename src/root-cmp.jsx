import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/login";
import { PageNotFound } from "./pages/page-not-found";
import './assets/scss/styles.scss'
import { Register } from "./pages/register";

function App() {
  return (
    <Routes>
      <Route path="/" Component={Login} />
      <Route path="/register" Component={Register} />
      
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
