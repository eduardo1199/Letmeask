import {useState, useEffect} from 'react';
import { database } from '../services/Firebase';

type author  = {
  name: string,
  avatar: string,
}

type ListQuestions = {
  key: string,
  content: string,
  author: author,
  isAnswered: boolean,
  isHighLight: boolean
}

type TypeQuestions = Record<string, {
  author: author,
  content: string,
  isAnswered: boolean,
  isHighLight: boolean
}>


export function useRoom(id: string){
  const [listQuestions, setlistQuestions] = useState<ListQuestions[]>([]);
  const [title, settitle] = useState('');

  useEffect(() => {
    const roomRef = database.ref(`rooms/${id}`);
    roomRef.on('value', (room: any) => {
      const firebaseRoomData = room.val();
      console.log(firebaseRoomData);
      const Questions: TypeQuestions = firebaseRoomData.questions ?? {};
      const ListQuestions = Object.entries(Questions).map(([key, value]) => {
        return {
          key:key,
          content:value.content,
          author:value.author,
          isAnswered: value.isAnswered,
          isHighLight: value.isHighLight
        }
      });
      setlistQuestions(ListQuestions);
      settitle(firebaseRoomData.title);
    })
  },[id]);

  return {listQuestions, title};

}