import logoImg from '../images/logo.svg';
import {Button} from '../components/Button';
import '../styles/room.scss';
import {RoomCode} from '../components/RoomCode';
import { useParams} from 'react-router-dom';
import { useState, FormEvent } from 'react';
import useAuth from '../hooks/AthContext';
import { database } from '../services/Firebase';
import {Questions} from '../components/Question';
import {useRoom} from '../hooks/useRoom';


type PathName = {
  id: string;
}

export function Room(){

  const {user}= useAuth();
  const params = useParams<PathName>();
  const paramsId: string = params.id;
  const [newQuestion, setNewQuestion] = useState('');
  const {listQuestions, title} = useRoom(paramsId);
   
  async function createQuestion(event: FormEvent){
    event.preventDefault();

    if(newQuestion.trim() === ''){
      return;
    }
    if(!user){
      throw new Error("Invalid User");
    }
    let question = {
      content: newQuestion,
      author: {
        name: user.displayName,
        avatar: user.photoURL,
      },
      isHighLight: false,
      isAnswered: false
    }
    await database.ref(`rooms/${paramsId}/questions`).push(question);
    setNewQuestion('');
    alert("Comentario Enviado Com Sucesso");
  }

  return(
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Logo" />
          <RoomCode code={params.id} />
        </div>
      </header>
      <main>
        <div className="room-tittle">
          <h1>{title}</h1>
          {listQuestions.length > 0 && <span>{listQuestions.length} perguntas</span>}
        </div>
        <form onSubmit={createQuestion}>
          <textarea 
            name="question" 
            placeholder="O que voce quer perguntar" 
            onChange={e => setNewQuestion(e.target.value)}
            value={newQuestion}/>
          <div className="form-footer">
            {!user ? 
              <span>Para enviar uma pergunta, <button>faça seu login.</button></span>
              : 
              <div className="user-info">
                <img src={user.photoURL} alt={user.displayName}></img>
                <span>{user.displayName}</span>
              </div>
            }
            <Button type="submit" disabled={!user}>Enviar Pergunta</Button>
          </div>
        </form>
        {listQuestions.length > 0 ? (
          <div className="list-questions">
            {listQuestions.map((question) => {
              return(
                <Questions
                  key={question.key} 
                  content={question.content}
                  author={question.author}
                />
              )
           })}
          </div>
        ):(
          <div className="no-Questions">
            <span>Não tem perguntas nessa sala!</span>
          </div>
        )}
      </main>
    </div>
  );
}