import Header from "./components/header/Header.jsx";
import NavigationBar from "./components/navigationBar/NavigationBar.jsx";
import SignIn from "./pages/signIn/SignIn.jsx";
import CreateFreeAccount from "./pages/createFreeAccount/CreateFreeAccount.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";
import Footer from "./components/footer/Footer.jsx";
import "./App.css";
import { Routes, Route } from "react-router-dom"
import navigationUrls from "./constants/navigationUrls.js";

function App() {

  return (
    <div className="page-wrapper">
        <Header />
        <NavigationBar />
        <Routes>
            <Route path={navigationUrls.find(url => url.id === 'Sign In').url} element={<SignIn />} />
            <Route path={navigationUrls.find(url => url.id === 'Create Free Account').url} element={<CreateFreeAccount />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
    </div>
  )
}

export default App;
