import '../styles/questions.scss';

type Author  = {
  name: string,
  avatar: string,
}

type Question = {
  content: string;
  author: Author;
}

export function Questions({
  content, author
}: Question){
  return(
    <div className="question">
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div></div>
      </footer>
    </div>
  )
}