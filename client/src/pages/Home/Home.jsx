import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Header from '../components/Header';
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";


const Home = () => {

  const navItems = [

    {
      name: "Login",
      url: "/login"
    },
  
  ]

  const [user, setUser] = useState({
    email:"",
    password:""
   })
  
   const navigate = useNavigate()
  
   const handleLogin = async e =>{
      e.preventDefault()
      try{
        const res = await axios.post("http://localhost:8800/login",user )
        const {data} = res
        if(data.message === "Login concluído"){ 
          console.log(data.email)
          navigate("/main", {state:{email: data.email}}) 
        }
        else if(data === "Usuário não encontrado."){
          console.log("Usuário não encontrado.")
        }
        else{
          console.log(data)
        }
      }catch(err){
        console.log(err)
      }
    }
  
    const handleChange = (e) => {
      console.log(e.target.name, ": ", e.target.value)
      setUser((prev) => ({...prev, [e.target.name] : e.target.value}))
    }
  return(
    <Layout>
      <Header/>
      <div className="login-conteiner">
        <form className="login-form" onSubmit={handleLogin} ></form>
        <h1>Login </h1>
        <div className="form-group">
          <InputText placeholder="E-mail" type="text"  onChange={handleChange} name="email" /><br />
        </div>
        <div className="form-group">
          <InputText placeholder="Senha" type="password" onChange={handleChange} name="password" /><br />
        </div>
        <Button label="Entrar" type="submit" onClick={handleLogin}/>
        <a href="/register">Registrar-se</a>
      </div>
    </Layout>
  )
}

export default Home