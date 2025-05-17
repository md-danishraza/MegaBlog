import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { login, logout } from "./features/authSlice";
import authService from "./Services/auth";
import { useDispatch } from "react-redux";
function App() {
  const [loading, setLoading] = useState(false);
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
  }, []);

  if (loading) return <h1>..loading</h1>;

  return (
    <>
      <Header />
      <main>
        <h1>MegaBlog</h1>
        {/* outlet */}
      </main>
      <Footer />
    </>
  );
}

export default App;
