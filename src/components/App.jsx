import { useState, useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
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
  const structure = cardList.reduce((acc, ca) => {
    if (Object.hasOwn(acc, ca.category)) {
      if (Object.hasOwn(acc[ca.category], ca.topic)) {
        acc[ca.category][ca.topic]={...acc[ca.category][ca.topic], [ca.id]: ca }
        return acc;
      }
      acc[ca.category] = { ...acc[ca.category], [ca.topic]: {[ca.id]: ca} };
      return acc
    }
    return { ...acc, [ca.category]: { [ca.topic]: {[ca.id]: ca} } };
  }, {});
  return (
    <>
      <NavBar />
      <div id="categories">
        {Object.keys(structure).map((cat,i)=><NavLink className="nav-link" to={`/c/${cat}`} key={i}>{cat}</NavLink>)}
      </div>
      {!toggleLoading && <Outlet context={{cardList: cardList, structure: structure, setCardList:setCardList, favorites: favorites, setFavorites: setFavorites}} />}
    </>
  )
}

export default App
