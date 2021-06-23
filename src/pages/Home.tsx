import illustration from '../images/illustration.svg';
import logo from '../images/logo.svg';
import google from '../images/google-icon.svg';
import '../styles/home.scss';

export function Home(){
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
                    <button>
                        <img src={google} alt="" />
                        Crie Sua sala com o google
                    </button>
                    <div>Ou entre em uma sala</div>
                    <form action="">
                        <input type="text" placeholder="Digite código da sala"/>
                        <button type="submit">Entrar na sala</button>
                    </form>
               </div>
           </main>
        </div>
    ); 
}

