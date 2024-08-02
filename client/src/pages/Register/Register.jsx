import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import Header from "../components/Header";

const Register = () => {

  const[user, setUser] = useState({
    nome:"",
    telefone:"",
    endereco:"",
    email:"",
    password:""
  })

  const navItems = [

    {
      name: "Voltar",
      url: "/"
    },
  
  ]

  const navigate = useNavigate()

  const handleChange = (e) => {
    console.log(e.target.name, ": ", e.target.value)
    setUser((prev) => ({...prev, [e.target.name] : e.target.value}))
  }

  const handleClick = async e => {
    e.preventDefault()
    try{
      // chama o método post "/user" la do server js que faz o insert no banco de dados
      await axios.post("http://localhost:8800/register", user) 
      navigate("/")
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <Layout>
      <Header navItems={ navItems} />
      <div className="register-conteiner">
        <div className="form-group">
          <h1> Insira seus dados </h1>
          <InputText placeholder="Nome" onChange={handleChange} name="nome" /><br />
          <InputText  placeholder="Telefone" onChange={handleChange} name="telefone" /><br />
          <InputText  placeholder="Endereço" onChange={handleChange} name="endereco" /><br />
          <InputText placeholder="E-mail" onChange={handleChange} name="email" /><br />
          <InputText placeholder="Senha" onChange={handleChange} name="password" /><br/>
        </div>
        <Button label="Enviar" type="submit" onClick={handleClick}/>
      </div>
    </Layout>
  )
}

export default Register