import { useRoutes } from "react-router";
import Routes from "./routes";
import AuthContext from "./context/authContext";
import { useCallback, useEffect, useState } from "react";

function App() {
  const router = useRoutes(Routes);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = useCallback((userinfo, token) => {
    setToken(token);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(token));

    // Fetch user data immediately after login
    fetch('http://localhost:3000/v1/auth/me', {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((userData) => {
        setUserInfo(userData);
      })
      .catch((err) => {
        console.error("Error fetching user data after login:", err);
      });
  }, []);

  const logOut = useCallback(() => {
    setToken(null);
    setUserInfo({});
    setIsLoggedIn(false);
    localStorage.removeItem("user");
  }, []);

  // Get user data after the user opens the website
  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    if (localStorageData) {
      fetch("http://localhost:3000/v1/auth/me", {
        headers: {
          "Authorization": `Bearer ${localStorageData}`,
        },
      })
        .then((res) => res.json())
        .then((userData) => {
          setIsLoggedIn(true);
          setUserInfo(userData);
        })
        .catch((err) => {
          console.error("Error fetching user data on app load:", err);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn,
          token,
          userInfo,
          login,
          logOut,
        }}
      >
        {router}
      </AuthContext.Provider>
    </>
  );
}

export default App;