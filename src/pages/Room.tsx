import logoImg from '../images/logo.svg';
import {Button} from '../components/Button';
import '../styles/room.scss';
import {RoomCode} from '../components/RoomCode';

export function Room(){

  function functionTeste(){
    return;
  }

  return(
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Logo" />
          <RoomCode code="wdwdada" />
        </div>
      </header>
      <main>
        <div className="room-tittle">
          <h1>Sala React</h1>
          <span>
            4 perguntas
          </span>
        </div>
        <form onSubmit={functionTeste}>
          <textarea name="" id="" placeholder="O que voce quer perguntar"/>
          <div className="form-footer">
            <span>Para enviar uma pergunta, <button>faça seu login.</button></span>
            <Button className="button" type="submit">Enviar Pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  );
}