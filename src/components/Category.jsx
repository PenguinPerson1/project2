import { useParams, Outlet, useOutletContext } from 'react-router-dom'
import NavBar from './NavBar'

export default function Category(){
  const params = useParams()
  const {cardList,structure,favorites,setFavorites} = useOutletContext()
  const categoryCards = cardList.filter(card=>card.category===params.category)
  return(
    <>
      <NavBar navLinks={
        structure.get(params.category).keys().toArray().map(top=>{
          return{name:top,id:top,navi:`/c/${params.category}/t/${top}`}})
      } type={{text:true}} />
      <Outlet context={{categoryCards:categoryCards,structure:structure.get(params.category),favorites:favorites,setFavorites:setFavorites}} />
    </>
  )
}