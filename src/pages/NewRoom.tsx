import illustration from '../images/illustration.svg';
import { useContext } from 'react';
import logo from '../images/logo.svg';
import '../styles/home.scss';
import { Button } from '../components/Button';
import {Link} from 'react-router-dom';
import { AuthContext } from '../contexts/AuthControler';

export function NewRoom(){

  const {user} = useContext(AuthContext)

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
                    <form action="">
                        <input type="text" placeholder="Nome da sala"/>
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

