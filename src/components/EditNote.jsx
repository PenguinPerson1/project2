import { useNavigate, useParams, useOutletContext, useLocation } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import NoteForm from './NoteForm'

export default function EditNote(){
  const params = useParams()
  const navigate = useNavigate()
  const { prev } = useLocation().state;
  const {cardList, setCardList, structure, favorites,setFavorites} = useOutletContext()
  const card = cardList.find(card => card.id===params.id)

  function trimFavorites(category,topic) {
    if(structure.get(category).get(topic).size===1){
      const favToDelete = favorites.find(fav=>fav.topic===topic && fav.category===category)
      return favToDelete?.id!==undefined? ['favorite',favToDelete.id] : ['last',null]
    }
    return ['back',null]
  }
  function handleSubmit(formData,setFormData,linkData) {
    fetch(`http://localhost:3000/Notes/${params.id}`,{ 
      method: 'PATCH' ,
      headers: {
          'Content-Type':'Application/JSON',
          'Accept':'Application/JSON'
        },
      body: JSON.stringify({
        category: formData.category,
        topic: formData.topic,
        title: formData.title,
        text: formData.text,
        links: linkData,
      })
    })
    .then(r=>r.json())
    .then(data => {
      setCardList(cardList.map(card=>card.id===data.id?data:card))
      const favId = trimFavorites(card.category,card.topic)
      alert("Your note has been updated")
      switch (favId[0]) {
        case 'favorite':
          fetch(`http://localhost:3000/Favorites/${favId[1]}`,{ 
            method: 'PATCH',
            headers: {
              'Content-Type':'Application/JSON',
              'Accept':'Application/JSON'
            },
            body: JSON.stringify({
              category: data.category,
              topic: data.topic,
            })
          })
          .then(r=>r.json())
          .then(newFav => setFavorites(favs=>favs.map(fav=>fav.id===newFav.id? newFav : fav)))
          if (prev==="topic") {
            navigate(`/c/${data.category}/t/${data.topic}`)
            break;
          }
        case 'last':
        case 'back':
          if(prev==="gen") { navigate('/n') }
          else{ navigate(-1) }
          break;
        default:
          navigate('/')
          break;
      }
    })
  }

  function handleDelete(){
    fetch(`http://localhost:3000/Notes/${params.id}`,{ method: 'DELETE' })
    .then(()=>{
      setCardList(cardList=>cardList.filter(card => card.id!==params.id))
      const favId = trimFavorites(card.category,card.topic)
      switch (favId[0]) {
        case 'favorite':
          fetch(`http://localhost:3000/Favorites/${favId[1]}`,{ method: 'DELETE' })
          .then(()=>setFavorites(favs=>favs.filter(fav=>fav.id!==favId[1])))
        case 'last':
          if(prev==="topic"){
            navigate('/')
            break;
          }
        case 'back':
          if(prev==="gen") { navigate('/n') }
          else{ navigate(-1) }
          break;
        default:
          navigate('/')
          break;
      }
    })
  }
  return(
    <>
      <NoteForm cardList={cardList} card={card} onSubmit={handleSubmit} handleDelete={handleDelete} />
      {/* <Button onClick={handleDelete}>Delete Note</Button>  */}
    </>
  )
}