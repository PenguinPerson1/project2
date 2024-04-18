import { Outlet, useOutletContext } from 'react-router-dom'
import NavBar from './NavBar'


export default function CategoryGeneral(){
  const {cardList, setCardList, structure, favorites,setFavorites} = useOutletContext()
  const categories = structure.entries().toArray().map(val=>{
    return{name:val[0],id:val[0],navi:`/c/${val[0]}`}})
  return(
    <>
      <NavBar navLinks={categories} type={{secondary:true}} />
      <Outlet context={{cardList, structure, setCardList, favorites, setFavorites}} />
    </>
  )
}