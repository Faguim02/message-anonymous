import { FirebaseApp } from 'firebase/app'
import style from './style.module.css'
import Dialogue from '../../components/Dialogue'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, getFirestore } from 'firebase/firestore/lite'
import { useEffect, useState } from 'react'

interface propsType{
    app: FirebaseApp
}

interface MessageType {
    userName: string;
    message: string;
    date: string;
}

export default function PanelComments({app}: propsType){

    const navigate = useNavigate()

    const db = getFirestore(app)

    const [messages, setMessages] = useState<MessageType[]>([])

    useEffect(()=>{

        (async()=>{
            try {
                const messageResponse: MessageType[] | any = await getMessages(db)
                setMessages(messageResponse)
            } catch (error) {
                console.error("Erro ao buscar mensagens:", error);
            }
        })()

    },[db])


    async function getMessages(db: any){
        const messagesCol: any = collection(db, 'messages');
        const messagesSnapshot = await getDocs(messagesCol);
        const messageList = messagesSnapshot.docs.map(doc => doc.data());
        return messageList;
    }

    return(
        <>
            <article className={style.container}>
                <button className={style.button} onClick={()=>navigate('/newMessage')}>Nova mensagem</button>
                {messages.length == 0 && (
                    <div className={style.empaty}>
                        <p>Carregando...</p>
                    </div>
                )}
                {messages.map((message, index) => (
                    <Dialogue key={index} userName={message.userName} date={message.date} message={message.message}/>
                ))}
            </article>
        </>
    )
}