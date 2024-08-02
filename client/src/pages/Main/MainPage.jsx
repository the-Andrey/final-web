import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import Header from "../components/Header";

const MainPage = () => {

  const navItems = [

    {
      name: "Logout",
      url: "/"
    },
  
  ]

  return(
    <Layout>
      <Header navItems={ navItems} />
      <div className="main-page">
          <div>
            <h1> coisa 1</h1>
          </div>
          <div>
            <h1> coisa 2 </h1>
          </div>
      </div>
    </Layout>
  )

}

export default MainPage