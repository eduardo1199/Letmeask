import '../styles/questions.scss';
import {ReactNode} from 'react';

type Author  = {
  name: string;
  avatar: string;
}

type Question = {
  content: string;
  author: Author;
  children?: ReactNode;
  isAnswered?: boolean;
  isHighLight?:boolean;
}

export function Questions({
  content, author,children, isAnswered = false, isHighLight = false
}: Question){
  return(
    <div className={`question ${isAnswered ? 'answered': ''} ${isHighLight && !isAnswered ? 'highLight' : ''}`}>
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  )
}