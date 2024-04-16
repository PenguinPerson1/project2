import {useState} from 'react'
export default function NoteForm({cardList,card,onSubmit}) {

  const [linkData,setLinkData] = useState([...card.links])
  const [formData,setFormData] = useState({...card})
  const [formLinks,setFormLinks] = useState({ link_url:"",link_text:"" })

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
  function removeLink() {
    setLinkData(linkData.slice(0,-1))
  }
  function handleSubmit(e){
    e.preventDefault()
    onSubmit(formData,setFormData,linkData)
  }

  return (
    <div id='form-container'>
      <form id="form" onSubmit={handleSubmit}>
        <label htmlFor="category">Category:</label>
        <input id='category' list='categories' type="category" name="category" onChange={handleChange} value={formData.category}/>
        <datalist id = 'categories'>
          {[...categories].map((cat,i) => <option key={i} value={cat} />)}
        </datalist>
        <label htmlFor="topic">Topic:</label>
        <input id='topic' list='topics' type="text" name="topic" onChange={handleChange} value={formData.topic}/>
        <datalist id = 'topics'>
          {[...topics].map((top,i) => <option key={i} value={top} />)}
        </datalist>
        <label htmlFor="title">Note Summary:</label>
        <input id='title' type="text" name="title" placeholder="Enter Summary" required={true} onChange={handleChange} value={formData.title}/>
        <br />
        <label htmlFor="text" required={true}>Note Text:</label>
        <textarea id='text' name="text" cols="30" rows="5" placeholder="Enter Note" onChange={handleChange} value={formData.text}/>
        <button type="submit">Submit</button>
      </form>
      <form id="form-links" onSubmit={addLink}>
        <label htmlFor="link_text">Link Text:</label>
        <input id= "link_text" type="text" name="link_text" required={true} onChange={handleLinkChange} value={formLinks.link_text}/>
        <button type="button" onClick={removeLink}>Delete</button> 
        <label htmlFor="link_url">Link Url:</label>
        <input id='link_url' type="text" name="link_url" required={true} onChange={handleLinkChange} value={formLinks.link_url}/>
        <input type="submit" value="Add"></input>
        <br />
        <ul id="links-display">
          {linkData.map((link,i)=><a href={link[1]} key={i}>{link[0]}</a>)}
        </ul>
      </form>
    </div>
  )
}