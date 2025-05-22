import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { login, logout } from "./features/authSlice";
import authService from "./Services/auth";
import { useDispatch } from "react-redux";

import { Outlet } from "react-router-dom";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  // checking user on initial render
  // if exist then update the user state
  useEffect(() => {
    authService
      .getUser()
      .then((user) => {
        user ? dispatch(login(user)) : dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) return <h1>..loading</h1>;

  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      <main>
        <Outlet />
      </main>

      <Footer />
    </section>
  );
}

export default App;
