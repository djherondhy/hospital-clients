import React, { useState, useEffect, ChangeEvent } from 'react';
import { useHistory, useParams} from 'react-router-dom'
import {  Button, Form } from 'react-bootstrap';
import api from '../../services/api'
import styles from '../Home.module.scss';


interface IPaciente{
    nome: string;
    telefone: string;
    cpf:string;
    foto:string;
    email:string;
    
}

interface IParamsProps {
    id: string;
}



const Paciente: React.FC = () => {

    const history = useHistory()
    const { id } = useParams<IParamsProps>()
    const [profile, setProfile] = useState<string | undefined>("")
    const [alterFoto, setAlterFoto] = useState<boolean>()

    
    
 
    const [model, setModel] = useState<IPaciente>({
        nome: '',
        telefone:'',
        cpf: '',
        foto: '',
        email:''
    })

 
 

    function onFileChange(event: any) {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
        const data = reader.result?.toString();        
        console.log(data);
    

        setProfile(data);
        
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };

      
        setAlterFoto(true)
      }

    useEffect(() => {
        console.log(id)
        if(id !== undefined){
            findClients(id)
        }

        

    }, [id])

    
    function updatedModel(e: ChangeEvent<HTMLInputElement>){
        
        setModel({
            ...model,
            [e.target.name]: e.target.value,
            
        })
    }

  
    async function onSubmit(e: ChangeEvent<HTMLFormElement>){
       
        e.preventDefault()
        if(alterFoto){
            model.foto = `${profile?.toString()}`
        }
        if(id !== undefined){
            const response = await api.put(`/pacientes/${id}`,model)
        }else{
            const response = await api.post('/pacientes',model)
        }

        back()
        
    }


    function back(){
        history.goBack()
      }
    
      async function findClients (id: string){

        const response = await api.get(`pacientes/${id}`)
        console.log(response)

        setModel({
            nome: response.data.nome,
            telefone: response.data.telefone,
            cpf: response.data.cpf,
            foto: response.data.foto,
            email: response.data.email
        })
      }
    
    
  return(
    <div className="container">

      <div className={styles.header}>
        <h1>Pacientes</h1>

        <Button variant="dark" onClick={back}>Return</Button>

      </div>
      {
          !alterFoto ? (
            <img src={model.foto} height="200px" />
           
          ):(
            <img src={profile} height="200px" />  
          )
      }
      
      <br/>
            <br/>
      <Form onSubmit={onSubmit}>

            <Form.Group>
            <Form.File id="exampleFormControlFile1" label="Selecione a Foto do Paciente" 
                onChange={(event: any) =>{
                    onFileChange(event)
                    
                }}
            />
     
        {
           
                alterFoto?(
                    <Form.Control size="sm" type="text" placeholder="Imagem na Base64" 
                    name="foto"
                    value={profile}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                    />
                ):(
                  
                    <Form.Control size="sm" type="text" placeholder="Imagem na Base64" 
                    name="foto"
                    value={model.foto}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                    />
                )
            
        }
           
       
        </Form.Group>
        <br/>
        
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Nome </Form.Label>
            <Form.Control type="text" placeholder="Digite o Nome Completo" 
                name="nome" 
                value={model.nome}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
            />
           
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
            <Form.Label>Telefone </Form.Label>
            <Form.Control type="text" placeholder="Digite o Telefone " 
            name="telefone" 
            value={model.telefone}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
            />
            <Form.Text className="text-muted">
                 Digite somente os números
            </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
            <Form.Label>CPF </Form.Label>
            <Form.Control type="text" placeholder="Digite o CPF " 
              name="cpf" 
              value={model.cpf}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
            />
            <Form.Text className="text-muted">
                 Digite somente os números
            </Form.Text>
        </Form.Group>
      
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Email </Form.Label>
            <Form.Control type="email" placeholder="Digite o email" 
            name="email" 
            value={model.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
            />
        </Form.Group>
        <Button variant="primary" type="submit">
            Salvar
        </Button>
    </Form>

    <br/>
    <br/>
    <br/>
    </div>

  )
}

export default Paciente;