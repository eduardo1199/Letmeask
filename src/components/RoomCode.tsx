import copyImg from '../images/copy.svg';
import '../styles/roomCode.scss';

type RoomCode = {
  code?: undefined | string;
}

export function RoomCode(props: RoomCode){

  function copyRoomCode(){
    if(props.code){
      navigator.clipboard.writeText(props.code)
    }else{
      return;
    }
  }

  return(
    <button className="room-code" onClick={copyRoomCode}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala {props.code}</span>
    </button>
  )
}