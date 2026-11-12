import Header from "./components/header/Header.jsx";
import NavigationBar from "./components/navigationBar/NavigationBar.jsx";
import CreateBike from "./pages/createBike/CreateBike.jsx";
import UpdateBike from "./pages/updateBike/UpdateBike.jsx";
import CreateBikeRide from "./pages/createBikeRide/CreateBikeRide.jsx";
import SignIn from "./pages/signIn/SignIn.jsx";
import CreateFreeAccount from "./pages/createFreeAccount/CreateFreeAccount.jsx";
import MyAccount from "./pages/myAccount/MyAccount.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";
import MessagePage from "./components/messagePage/MessagePage.jsx";
import Footer from "./components/footer/Footer.jsx";
import "./App.css";
import {Routes, Route, Navigate} from "react-router-dom"
import navigationUrls from "./constants/navigationUrls.js";
import {AuthContext} from "./context/AuthContext.jsx";
import {useContext} from "react";

function App() {
    const {isAuth, user} = useContext(AuthContext);

  return (
    <div className="page-wrapper">
        <Header />
        <NavigationBar />
        <Routes>
            <Route
                path={navigationUrls.find(url => url.id === 'Create Bike').url}
                element={
                    isAuth === true
                    ? user.userRole === "ROLE_CYCLIST"
                        ? <CreateBike />
                        : <MessagePage
                            title="You are not a Cyclist"
                            text="Only Cyclists can add, update or delete Bikes... go to "
                            linkUrlWithoutBase={navigationUrls.find((item) => item.id === 'Home').url}
                            linkText="Home"
                        />
                    : <Navigate to={navigationUrls.find(url => url.id === 'Sign In').url} />
                }
            />
            <Route
                path={navigationUrls.find(url => url.id === 'Update Bike').url}
                element={
                    isAuth === true
                    ? user.userRole === "ROLE_CYCLIST"
                        ? <UpdateBike />
                        : <MessagePage
                            title="You are not a Cyclist"
                            text="Only Cyclists can add, update or delete Bikes... go to "
                            linkUrlWithoutBase={navigationUrls.find((item) => item.id === 'Home').url}
                            linkText="Home"
                        />
                    : <Navigate to={navigationUrls.find(url => url.id === 'Sign In').url} />
                }
            />
            <Route
                path={navigationUrls.find(url => url.id === 'Create Bike Ride').url}
                element={
                    isAuth === true
                    ? <CreateBikeRide />
                    : <Navigate to={navigationUrls.find(url => url.id === 'Sign In').url} />
                }
            />
            <Route
                path={navigationUrls.find(url => url.id === 'Sign In').url}
                element={
                    isAuth === false
                    ? <SignIn />
                    : <MessagePage
                        title="You are already signed in."
                        text="Sign out and then sign in as another user or... go to "
                        linkUrlWithoutBase={navigationUrls.find((item) => item.id === 'Home').url}
                        linkText="Home"
                    />
                }
            />
            <Route
                path={navigationUrls.find(url => url.id === 'Create Free Account').url}
                element={
                    isAuth === false
                    ? <CreateFreeAccount />
                    : <MessagePage
                        title="You are signed in."
                        text="First sign out and then you can create a new account, or... go to "
                        linkUrlWithoutBase={navigationUrls.find((item) => item.id === 'Home').url}
                        linkText="Home"
                    />
                }
            />
            <Route
                path={navigationUrls.find(url => url.id === 'My Account').url}
                element={
                    isAuth === true
                    ? <MyAccount />
                    : <MessagePage
                        title="You are not signed in."
                        text="To view and edit your account, first "
                        linkUrlWithoutBase={navigationUrls.find((item) => item.id === 'Sign In').url}
                        linkText="Sign In"
                    />
                }
            />
            <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
    </div>
  )
}

export default App;
