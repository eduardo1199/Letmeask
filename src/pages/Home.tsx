import illustration from '../images/illustration.svg';
import logo from '../images/logo.svg';
import google from '../images/google-icon.svg';
import '../styles/home.scss';
import { Button } from '../components/Button';
import {useHistory} from 'react-router-dom';
import AthContext from '../hooks/AthContext';
import {FormEvent, useState} from 'react';
import {database} from '../services/Firebase';

export function Home(){

    const history = useHistory();
    const {user, signInWithPopup} = AthContext();
    const [sala, setSala] = useState('');

    async function handleCreateRoom(){
        if(!user){
            try {
               await signInWithPopup();
            }catch(e){
                console.log(e.message);
            }
        }
        history.push('/room/new'); 
    }

    async function handleRoomExisting(event: FormEvent){
        event.preventDefault();
        if(sala.trim() === '') return;

        const roomRef = await database.ref(`rooms/${sala}`).get();

        if(!roomRef.exists()){
            alert("Sala Inexistente!")
            return;
        }
        history.push(`/room/${sala}`);
    }

    return(
        <div id='page-auth'>
           <aside>
               <img src={illustration} alt="illustration" />
               <strong>Crie Salas de Q&A ao-vivo</strong>
               <p>Tire as dúvidas da sua audiência em tempo-real</p>
           </aside>
           <main>
               <div className="main-content">
                    <img src={logo} alt="logo" />
                    <button className="run" onClick={() => handleCreateRoom()}>
                        <img src={google} alt="" />
                        Crie sua sala com o google
                    </button>
                    <div className="saparator">Ou entre em uma sala</div>
                    <form onSubmit={handleRoomExisting}>
                        <input 
                            type="text" 
                            placeholder="Digite código da sala"
                            onChange={e => setSala(e.target.value)}
                            value={sala}
                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
               </div>
           </main>
        </div>
    ); 
}

