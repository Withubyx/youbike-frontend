import Header from "./components/header/Header.jsx";
import NavigationBar from "./components/navigationBar/NavigationBar.jsx";
import Footer from "./components/footer/Footer.jsx";
import "./App.css";
// import { Routes, Route } from "react-router-dom"

function App() {

  return (
    <>
        <Header />
        <NavigationBar />
        {/*<Routes>*/}
            {/*<Route path="/" element={<Home/>} />*/}
            {/*<Route path="/bikes" element={<Bikes>} />*/}
            {/*<Route path="/bike-rides" element={<BikeRides>} />*/}
            {/*<Route path="/my-bikes-and-bike-rides" element={<MyBikesAndBikeRides>} />*/}
            {/*<Route path="/create-free-account" element={<CreateFreeAccount>} />*/}
            {/*<Route path="/my-account" element={<MyAccount>} />*/}
        {/*</Routes>*/}
        <Footer />
    </>
  )
}

export default App;
