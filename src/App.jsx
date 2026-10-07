import Header from "./components/header/Header.jsx";
import NavigationBar from "./components/navigationBar/NavigationBar.jsx";
import SignIn from "./pages/signInPage/SignIn.jsx";
import Footer from "./components/footer/Footer.jsx";
import "./App.css";
import { Routes, Route } from "react-router-dom"

function App() {

  return (
    <div className="page-wrapper">
        <Header />
        <NavigationBar />
        <Routes>
            <Route path="/sign-in" element={<SignIn />} />
        </Routes>
        <Footer />
    </div>
  )
}

export default App;
