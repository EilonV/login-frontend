import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/login";
import './assets/scss/styles.scss'

function App() {
  return (
    <Routes>
      <Route path="/" Component={Login} />
    </Routes>
  );
}

export default App;
