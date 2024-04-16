import { useNavigate, useParams, useOutletContext } from 'react-router-dom'
import NoteForm from './NoteForm'



export default function EditNote(){
  const params = useParams()
  const navigate = useNavigate()
  const {cardList, setCardList, structure, favorites,setFavorites} = useOutletContext()
  const card = cardList.find(card => card.id===params.id)

  function trimFavorites(category,topic) {
    if(Object.keys(structure[category][topic]).length===1){
      const favToDelete = favorites.find(fav=>fav.topic===topic && fav.category===category)
      return favToDelete?.id
    }
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
      if (favId !== undefined) {
        fetch(`http://localhost:3000/Favorites/${favId}`,{ 
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
      }
      
    })
  }

  function handleDelete(){
    fetch(`http://localhost:3000/Notes/${params.id}`,{ method: 'DELETE' })
    .then(()=>{
      setCardList(cardList=>cardList.filter(card => card.id!==params.id))
      const favId = trimFavorites(card.category,card.topic)
      if (favId !== undefined) {
        fetch(`http://localhost:3000/Favorites/${favId}`,{ method: 'DELETE' })
        .then(()=>setFavorites(favs=>favs.filter(fav=>fav.id!==favId)))
      }
    })
    navigate('/')
  }
  return(
    <>
      <NoteForm cardList={cardList} card={card} onSubmit={handleSubmit} />
      <button onClick={handleDelete}>Delete Note</button> 
    </>
  )
}