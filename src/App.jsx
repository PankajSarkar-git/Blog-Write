import  { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { useEffect } from "react";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router";

const App = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between items-center bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
         <Outlet/>
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div>
      <h1>Loading......</h1>
    </div>
  );

 
};

export default App;
