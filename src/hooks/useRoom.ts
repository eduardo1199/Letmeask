import {useState, useEffect} from 'react';
import { database } from '../services/Firebase';
import useAuth from '../hooks/AthContext';

type author  = {
  name: string,
  avatar: string,
}

type TypeQuestions = Record<string, {
  key: string,
  author: author,
  content: string,
  isAnswered: boolean,
  isHighLight: boolean,
  likes: Record<string, {
    authorId: string,
  }>
}>

type ListQuestions = {
  key: string,
  content: string,
  author: author,
  isAnswered: boolean,
  isHighLight: boolean,
  likeCount: number,
  likedId: string | undefined,
}


export function useRoom(id: string){
  const [listQuestions, setlistQuestions] = useState<ListQuestions[]>([]);
  const [title, settitle] = useState('');
  const {user} = useAuth();

  useEffect(() => {
    const roomRef = database.ref(`rooms/${id}`);
    roomRef.on('value', (room) => {
      const firebaseRoomData = room.val();
      const Questions: TypeQuestions = firebaseRoomData.questions ?? {};
      const ListQuestions = Object.entries(Questions).map(([key, value]) => {
        return {
          key:key,
          content:value.content,
          author:value.author,
          isAnswered: value.isAnswered,
          isHighLight: value.isHighLight,
          likeCount: Object.values(value.likes ?? {}).length,
          likedId: Object.entries(value.likes ?? {}).find(([key,like]) => like.authorId === user?.uid)?.[0]
        }
      });
      setlistQuestions(ListQuestions);
      settitle(firebaseRoomData.title);
    })

    return () => {
      roomRef.off('value');
    }
  },[id, user?.uid]);

  return {listQuestions, title};

}