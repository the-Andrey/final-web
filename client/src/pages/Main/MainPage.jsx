import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Header from "../components/Header";
import React, { useState, useRef , useEffect} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const MainPage = () => {

  const location = useLocation();
  const { email } = location.state || {};

  const navItems = [

    {
      name: "Logout",
      url: "/"
    },
  
  ]

  const [contacts, setContacts] = useState([])

  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const navigate = useNavigate()

  const deleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const delConnection = async(id) => {
    try{

      await axios.post("http://localhost:8800/delete ", {id}) 
      deleteContact(id);
    }
    catch(err){
      console.log(err)
    }
  }

  const editContact = (rowData) => {
    console.log(rowData)
    navigate("/updatecontact", {state:{rowData, emailUser:email}} )
  };

  const saveContact = async (rowData) => {
      try {
          await axios.post("http://localhost:8800/update", editedData);
          setContacts(contacts.map(contact => (contact.id === rowData.id ? editedData : contact)));
          setEditingRow(null);
      } catch (err) {
          console.log(err);
      }
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setEditedData({ ...editedData, [field]: value });
  };


  const deleteButtonTemplate = (rowData) => {
    return (
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => delConnection(rowData.id)} />
    );
  };

  const handleAddContact= () => {
    navigate('/addcontact',{state:{emailUser: email}} )
  }

  const handleDeleteContact= () => {
    navigate('/deletecontacts',{state:{name: email}})
  }  
  
  useEffect(()=>{
    const fetchAllProducts = async()=>{
      try{
        const res = await axios.post("http://localhost:8800/show", {email:email})
        console.log("Dados recebidos do servidor:", res.data);
        setContacts(res.data)
      }catch(err){
        console.log(err)
      }
    }
    fetchAllProducts()
  }, [])

  const editButtonTemplate = (rowData) => {
    if (editingRow === rowData.id) {
        return (
            <Button icon="pi pi-save" className="p-button-rounded p-button-success" onClick={() => saveContact(rowData)} />
        );
    }
    return (
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning" onClick={() => editContact(rowData)} />
    );
};

  const editableColumnTemplate = (rowData, field) => {
      if (editingRow === rowData.id) {
          return (
              <InputText value={editedData[field]} onChange={(e) => handleInputChange(e, field)} />
          );
      }
      return rowData[field];
  };

  return(
    <Layout>
      <Header navItems={ navItems} />
      <div className="main-page">
        <div>
          <DataTable value={contacts} 
                    dataKey="id" rowsPerPageOptions={[5, 10, 25]}
                    paginator rows={5}
                    emptyMessage="Nenhum contato encontrado."
                    showGridlines tableStyle={{ minWidth: '50rem' }}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown">
                <Column field="id" header="ID" ></Column>
                <Column field="name" header="Nome" ></Column>
                <Column field="telefone" header="Número de telefone" ></Column>
                <Column field="email" header="E-mail"></Column>
                <Column body={deleteButtonTemplate} header="Deletar"></Column>
                <Column body={editButtonTemplate} header="Editar"></Column>
            </DataTable>
        </div>
          <div className="button-main">
          <Button icon="pi pi-plus" className="p-button-rounded p-button-success" onClick={handleAddContact} />
          </div>
      </div>
    </Layout>
  )

}

export default MainPage