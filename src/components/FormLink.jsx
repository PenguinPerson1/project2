import { Button, Icon } from "semantic-ui-react"
export default function FormLink({link,i,removeLink}) {
  return (
    <div className="form-link">
      <Button compact icon onClick={()=>removeLink(i)}><Icon color="red" name="delete" fitted /></Button>
      <a href={link[1]}>{link[0]}</a>
    </div>
  )
}