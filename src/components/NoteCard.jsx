import { Link } from "react-router-dom"

export default function NoteCard({noteCard}) {
  
  return(
    <div className="notecard">
      <h2 className="card-title">{noteCard.title}</h2>
      <p className="card-text">{noteCard.text}</p>
      <div className="card-links">
        {noteCard.links.map((links,i)=>(
          <a href={links[1]} key={i}>{links[0]}</a>
        ))}
      </div>
      <Link className="card-edit" to={`/n/${noteCard.id}`}>EDIT</Link>
    </div>
  )
}