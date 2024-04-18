import {useState, useEffect} from 'react'
import { GridColumn, Grid, Form, FormTextArea, FormInput, FormButton, FormGroup, Button } from 'semantic-ui-react'
import FormLink from './FormLink'
export default function NoteForm({cardList,card,onSubmit,handleDelete}) {
  const [linkData,setLinkData] = useState([...card.links])
  const [formData,setFormData] = useState({...card})
  const [formLinks,setFormLinks] = useState({ link_url:"",link_text:"" })

  useEffect(()=>{
    setLinkData([...card.links])
    setFormData({...card})
    setFormLinks({ link_url:"",link_text:"" })
  },[card])

  const categories = new Set([])
  cardList.forEach(card => { categories.add(card.category) });

  const topics = new Set([])
  cardList.forEach(card => { topics.add(card.topic) });

  function handleChange(e){
    setFormData({ ...formData, [e.target.name]:e.target.value })
  }
  function handleLinkChange(e) {
    setFormLinks({ ...formLinks, [e.target.name]:e.target.value })
  }
  function addLink(e) {
    e.preventDefault()
    setLinkData([...linkData,[formLinks.link_text,formLinks.link_url]])
    setFormLinks({...formLinks, link_url: "", link_text: ""})
  }
  function removeLink(i) {
    setLinkData(linkData.toSpliced(i,1))
  }
  function handleSubmit(e){
    e.preventDefault()
    onSubmit(formData,setFormData,linkData)
  }
  return (
    <Grid id='form-container'>
      <GridColumn width={10}>
      <h3>Decide Note Content:</h3>
        <Form onSubmit={handleSubmit}>
          <FormGroup widths={'equal'}>
            <FormInput fluid label="Category:" list='categories' name='category' onChange={handleChange} value={formData.category} required={true} />
            <datalist id = 'categories'>
              {[...categories].map((cat,i) => <option key={i} value={cat} />)}
            </datalist>
            <FormInput fluid label="Topic:" list='topics' name='topic' onChange={handleChange} value={formData.topic} required={true} />
            <datalist id = 'topics'>
              {[...topics].map((top,i) => <option key={i} value={top} />)}
            </datalist>
          </FormGroup>
          <FormGroup>
            <FormInput label="Title:" name="title" placeholder="Add a Title" required={true} onChange={handleChange} value={formData.title} />
          </FormGroup>
          <FormGroup >
            <FormTextArea width={16} rows={8} label="Text:" name="text" placeholder="Add the Note" required={true} onChange={handleChange} value={formData.text} />
          </FormGroup>
          <FormButton fluid>Submit</FormButton>
          {handleDelete!==undefined && <Button fluid onClick={handleDelete}>Delete Note</Button>}
        </Form>
      </GridColumn>
      <GridColumn width={5}>
        <h3>Add Links:</h3>
        <Form onSubmit={addLink}>
          <FormInput label='Link Text:' name="link_text" required={true} onChange={handleLinkChange} value={formLinks.link_text}/>
          <FormInput label='Link URL:' name="link_url" required={true} onChange={handleLinkChange} value={formLinks.link_url}/>
          <FormButton>Add</FormButton>
        </Form>
        <ul id="links-display">
          {linkData.map((link,i)=><FormLink key={i} link={link} i={i} removeLink={removeLink}/>)}
        </ul>
      </GridColumn>
    </Grid>
  )
}