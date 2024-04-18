import { Link } from "react-router-dom"
import { CardContent, Card, Icon } from 'semantic-ui-react'


export default function NoteCard({noteCard}) {
  return(
    <Card as={Link} to={`/n/${noteCard.id}`} state={{ prev: "topic" }}>
      <CardContent header={noteCard.title} />
      <CardContent description={noteCard.text} />
      <CardContent extra>
        {noteCard.links.map((links,i)=>(
          <a href={links[1]} key={i}>{links[0]}</a>
        ))}
      </CardContent>
    </Card>
  )
}