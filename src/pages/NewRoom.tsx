import illustration from '../images/illustration.svg';
import logo from '../images/logo.svg';
import '../styles/home.scss';
import { Button } from '../components/Button';

export function NewRoom(){
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
                        <a href="w">Clique Aqui</a>
                    </p>
               </div>
           </main>
        </div>
    ); 
}

