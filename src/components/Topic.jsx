import { useParams, useOutletContext } from 'react-router-dom'
import { CardGroup, Icon, Checkbox } from 'semantic-ui-react'
import NoteCard from './NoteCard'

export default function Topic(){
  const params = useParams()
  const {structure,favorites,setFavorites} = useOutletContext()
  const favorite = favorites.find(fav=>fav.topic===params.topic&&fav.category===params.category)
  function changeFavorite(){
    if(favorite!==undefined){
      fetch(`http://localhost:3000/Favorites/${favorite.id}`,{ method: 'DELETE' })
      .then(()=>setFavorites(favs=>favs.filter(fav=>fav.id!==favorite.id)))
    }
    else{
      fetch('http://localhost:3000/Favorites',{
        method: 'POST',
        headers: {
          'Content-Type':'Application/JSON',
          'Accept':'Application/JSON'
        },
        body: JSON.stringify({
          category: params.category,
          topic: params.topic,
        })
      })
      .then(r=>r.json())
      .then(fav=>setFavorites(favs=>([...favs,fav])))
    }
  }
  return(
    <>
      <Checkbox 
        label={
          favorite!==undefined ? 
          <Icon color='yellow' name='star'/> :
          <Icon name='star outline'/>
        } 
        onChange={changeFavorite}
        checked={favorite!==undefined}
      />
      <CardGroup>
        {structure.get(params.topic).values().toArray().map(card=><NoteCard key={card.id} noteCard={card} />)}
      </CardGroup>
    </>
  )
}