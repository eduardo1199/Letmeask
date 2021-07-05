import illustration from '../images/illustration.svg';
import logo from '../images/logo.svg';
import '../styles/home.scss';
import { Button } from '../components/Button';
import {Link} from 'react-router-dom';
import AthContext from '../hooks/AthContext';
import {FormEvent, useState} from 'react';
import {database} from '../services/Firebase';
import {useHistory} from 'react-router-dom';

export function NewRoom(){

  const {user, signInWithPopup} = AthContext();
  const [inputValue, setInputValue] = useState('');
  const history = useHistory();
  async function handleCreateRoom(event: FormEvent){
    event.preventDefault();

    if(inputValue.trim() === '') return;

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
        title:inputValue,
        authorid: user?.uid,
    })

    history.push(`/room/${firebaseRoom.key}`);
  }

    if(user == null){
        return(
            <div className="loading-page">
                <h1>Loading...</h1>
            </div>
        )
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
                    <h2>Criar uma sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text" 
                            placeholder="Nome da sala"
                            onChange={e => setInputValue(e.target.value)}
                            value={inputValue}
                            />
                        <Button type="submit" className="button">Criar sala</Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? 
                        <Link to="/">Clique aqui</Link>
                    </p>
               </div>
           </main>
        </div>
    ); 
}

