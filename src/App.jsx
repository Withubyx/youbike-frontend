import Header from "./components/header/Header.jsx";
import NavigationBar from "./components/navigationBar/NavigationBar.jsx";
import SignIn from "./pages/signInPage/SignIn.jsx";
import NotFound from "./pages/notFoundPage/NotFound.jsx";
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
            <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
    </div>
  )
}

export default App;
