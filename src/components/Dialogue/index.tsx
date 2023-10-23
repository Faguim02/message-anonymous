import style from './style.module.css'

interface propsType{
    userName: string,
    message: string,
    date: string
}

export default function Dialogue({userName, message, date}: propsType){
    return(
        <section className={style.container}>
            <div>
                <p className={style.username}>{userName}</p>
                <p className={style.info}>{date}</p>
            </div>
            <p className={style.info}>
                {message}
            </p>
        </section>
    )
}