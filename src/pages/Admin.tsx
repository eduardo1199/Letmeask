import logoImg from '../images/logo.svg';
import {Button} from '../components/Button';
import '../styles/room.scss';
import {RoomCode} from '../components/RoomCode';
import { useParams} from 'react-router-dom';
import useAuth from '../hooks/AthContext';
import {Questions} from '../components/Question';
import {useRoom} from '../hooks/useRoom';


type PathName = {
  id: string;
}


export function AdminRoom(){

  const {user}= useAuth();
  const params = useParams<PathName>();
  const paramsId: string = params.id;
  const {listQuestions, title} = useRoom(paramsId);

  return(
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Logo" />
          <div className="header-admin">
            <RoomCode code={params.id} />
            <Button isOutlined>Encerrar Salas</Button>
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