import { useState, useEffect } from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'
import NavBar from './NavBar'

function App() {
  const [toggleLoading,setToggleLoading] = useState(true)
  const [cardList,setCardList] = useState([])
  const [favorites,setFavorites] = useState([])
  useEffect(()=>{
    fetch('http://localhost:3000/Notes')
    .then(r=>r.json())
    .then(data=>{
      setCardList(data)
      setToggleLoading(false)
    })
    .catch(error=>console.log(error))
    fetch('http://localhost:3000/Favorites')
    .then(r=>r.json())
    .then(data=>{
      setFavorites(data)
    })
    .catch(error=>console.log(error))
  },[])
  const structure = new Map()
  cardList.forEach(ca=>{
    if(structure.has(ca.category)){
      if (structure.get(ca.category).has(ca.topic)) {
        structure.get(ca.category).get(ca.topic).set(ca.id,ca)
      }
      else{
        structure.get(ca.category).set(ca.topic,new Map([[ca.id,ca]]))
      }
    }
    else{
      structure.set(ca.category,new Map([[ca.topic,new Map([[ca.id,ca]])]]))
    }
  })

  if(!toggleLoading){
    return (
      <>
        <NavBar navLinks={[
          { name: "Add Note", id: "add", navi: "/add" },
          { name: "View Notes", id: "view", navi: `/c` },
          { name: "Edit Note", id: "edit", navi: "/n" }
        ]} type={{tabular:true}} addHome={true}/>
        <Outlet context={{cardList: cardList, structure: structure, setCardList:setCardList, favorites: favorites, setFavorites: setFavorites}} />
      </>
    )
  }
}

export default App
