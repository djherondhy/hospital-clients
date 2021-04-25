import React from 'react';
import { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import Link from 'react-router-dom';
import NumberFormat from 'react-number-format';
import api from '../services/api';
import { Button, Table } from 'react-bootstrap';

import styles from './Home.module.scss';

interface IClients{
  id: number;
  nome: string;
  telefone: string;
  cpf:string;
  foto:string;
  email:string;

}

const Home: React.FC = () => {

  const [clients, setClients] = useState<IClients[]>([])
  const [foto, setFoto] = useState<string>("");

  const history = useHistory();

  useEffect(()=>{
    loadClients()

  },[])


   async function loadClients() {
    const res = await api.get('/clients');
    console.log(res)
    setClients(res.data)
  }

  function newClient(){
    history.push('/Clients');

  }

  function editClient(id: number){
    history.push(`/Clients/${id}`)

  }

  async function deleteClient(id: number){
    const res = await api.delete(`/clients/${id}`);
    loadClients()
  }

  return (
    <div className="container">

      <div className={styles.header}>
        <h1>Clientes</h1>

        <Button variant="dark" onClick={newClient}>Novo CLiente</Button>

      </div>
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nome</th>
          <th>Telefone</th>
          <th>CPF</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          clients.map(client =>(
        <tr key={client.id}>
           <td><img src={client.foto} width={200} className={styles.perfil} /></td>
          <td>{client.nome}</td>
          <td><NumberFormat value={client.telefone} displayType={'text'} format="(##)####-####" /></td>
          <td><NumberFormat value={client.cpf} displayType={'text'} format="###.###.###-##" /></td>
          <td>{client.email}</td>
         
          <td>
            <Button variant="primary" onClick={()=> editClient(client.id)}>Editar</Button>{' '}
            <Button variant="danger" onClick={()=> deleteClient(client.id)}>Excluir</Button>
          </td>
        </tr>
        ))
}
      </tbody>
    </Table>
    </div>
  );
}

export default Home;

