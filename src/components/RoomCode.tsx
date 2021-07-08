import copyImg from '../images/copy.svg';
import '../styles/roomCode.scss';

type RoomCode = {
  code: string;
}

export function RoomCode(props: RoomCode){

  function copyRoomCode(){
    navigator.clipboard.writeText(props.code)
  }

  return(
    <button className="room-code">
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>{props.code}</span>
    </button>
  )
}