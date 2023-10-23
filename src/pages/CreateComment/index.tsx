import { FirebaseApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore/lite";
import { collection, addDoc } from 'firebase/firestore/lite'
import style from './style.module.css'
import { Input, Textarea } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

interface propsType{
    app: FirebaseApp
}

export default function CreateComment({app}:propsType){

    const navigate = useNavigate()

    const db = getFirestore(app);

    const [userName, setUserName] = useState<string>('')
    const [message, setMessage] = useState<string>('')

    function formatCurrentDate():string {
        const currentDate = new Date();
    
        const day = currentDate.getDate().toString().padStart(2, '0'); // Garante que o dia tenha 2 dígitos
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Os meses começam em 0 (janeiro é 0)
        const year = currentDate.getFullYear();
    
        return `${day}/${month}/${year}`;
    }

    async function handlePostMessage() {

        try {
            const userNameFormat: string = userName?.length != 0 ? userName : "anônimo"

            const formattedDate = formatCurrentDate();

            if(message?.length != 0){

                const docRef = await addDoc(collection(db, 'messages'), {
                    userName: userNameFormat,
                    message: message,
                    date: formattedDate
                })

                console.log("Document written with ID: ", docRef.id);

                navigate('/')

            }else{
                console.log("Você não digitou sua menssagem")
            }

        } catch (error) {
            console.log("Erro ao enviar dados: "+error)
        }
    }

    return(
        <>
            <form className={style.container}>

                <h1>Crie uma publicação</h1>

                <Input placeholder='Seu nome (Opcional)' onChange={(e)=>setUserName(e.target.value)}/>
                <Textarea placeholder='Digite sua mensagem aqui' onChange={(e)=>setMessage(e.target.value)}/>
                <button style={{backgroundColor: '#51A3A3'}} type='button' onClick={handlePostMessage}>Postar</button>
                <button style={{backgroundColor: '#F8333C'}} onClick={()=>navigate('/')}>Cancelar</button>
            </form>
        </>
    )
}