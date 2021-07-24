import logoImg from '../images/logo.svg';
import {Button} from '../components/Button';
import '../styles/room.scss';
import {RoomCode} from '../components/RoomCode';
import { useParams} from 'react-router-dom';
import {Questions} from '../components/Question';
import {useRoom} from '../hooks/useRoom';
import deleteImg from '../images/delete.svg';
import checkImg from '../images/check.svg';
import answerImg from '../images/answer.svg';
import { database } from '../services/Firebase';
import {useHistory} from 'react-router-dom';


type PathName = {
  id: string;
}


export function AdminRoom(){

  const params = useParams<PathName>();
  const paramsId: string = params.id;
  const {listQuestions, title} = useRoom(paramsId);
  const history = useHistory();

  async function  handleDeleteQuestion(questionId: string){
    if(window.confirm('Você deseja excluir mesmo a pergunta ? ')){
       await database.ref(`rooms/${paramsId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string){
    await database.ref(`rooms/${paramsId}/questions/${questionId}`).update({
      isAnswered:true
    });

  }

  async function handleHightLightQuestion(questionId: string){
    await database.ref(`rooms/${paramsId}/questions/${questionId}`).update({
      isHighLight: true
    });

  }

  async function handleEndRoom() {
    database.ref(`rooms/${paramsId}`).update({
      endedAt: new Date(),
    })

    history.push('/');
  }

  return(
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Logo" />
          <div className="header-admin">
            <RoomCode code={params.id} />
            <Button isOutlined onClick={() => handleEndRoom()}>Encerrar Salas</Button>
          </div>
        </div>
      </header>
      <main>
        <div className="room-tittle">
          <h1>{title}</h1>
          {listQuestions.length > 0 && <span>{listQuestions.length} perguntas</span>}
        </div>
        {listQuestions.length > 0 ? (
          <div className="list-questions">
            {listQuestions.map((question) => {
              return(
                <Questions
                  key={question.key} 
                  content={question.content}
                  author={question.author}
                  isAnswered={question.isAnswered}
                  isHighLight={question.isHighLight}
                >
                 {!question.isAnswered && (
                    <>
                      <button onClick={() => handleCheckQuestionAsAnswered(question.key)}>
                        <img src={checkImg} alt="Marcar Pergunta como respondida" />
                      </button>
                      <button onClick={() => handleHightLightQuestion(question.key)}>
                        <img src={answerImg} alt="Dar destaque da pergunta" />
                      </button>
                    </>
                 )}
                  <button onClick={() => handleDeleteQuestion(question.key)}>
                    <img src={deleteImg} alt="delete" />
                  </button>
                </Questions>
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