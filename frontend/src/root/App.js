import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom'
import Layout from "../components/MainLayout";
import Routes from "../routes";
import '../css/index.scss'


const App = () => {
  const [login, setLogin] = useState(false);
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      setLogin(isLoggedIn)
    }
  }, []);
  return (
    <div>
      <Layout isLoggedIn={login}>
        <Routes isLoggedIn={login} />
      </Layout>
    </div>
  );
}


export default App;