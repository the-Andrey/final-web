import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import Header from "../components/Header";


const UpdateContact = () =>{


  const location = useLocation();
  const { emailUser } = location.state || {};
  const { rowData } = location.state || {};


  console.log("Location", emailUser)
  console.log("Row data :", rowData)

  const [formData, setFormData] = useState({
    nome: rowData.name,
    telefone: rowData.telefone,
    email: rowData.email,
  });

  const[contact, setContact] = useState({
    nome:rowData.name,
    telefone:rowData.telefone,
    email:rowData.email,
    id:rowData.id,
    emailUser:emailUser
  })

  const data = {contact, emailUser}


  const navItems = [

    {
      name: "Voltar",
      url: "/main"
    },
  
  ]

  const navigate = useNavigate()

  const handleChange = (e) => {
    console.log(e.target.name, ": ", e.target.value)
    setContact((prev) => ({...prev, [e.target.name] : e.target.value}))

    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const handleClick = async e => {
    e.preventDefault()
    try{
      // chama o método post "/user" la do server js que faz o insert no banco de dados
      await axios.post("http://localhost:8800/updatecontact", data) 
      navigate("/main",{state:{email: emailUser}} )
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
          <h1> Atualize os dados do contato </h1>
          <InputText value={formData.nome}  placeholder="Nome do contato" onChange={handleChange} name="nome" /><br />
          <InputText value={formData.telefone}  placeholder="Número de telefone " onChange={handleChange} name="telefone" /><br />
          <InputText  value={formData.email} placeholder="E-mail" onChange={handleChange} name="email" /><br />
        </div>
        <Button label="Enviar" type="submit" onClick={handleClick}/>

      </div>
    </Layout>
  )

}

export default UpdateContact