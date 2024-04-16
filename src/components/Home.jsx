import { useState, useEffect } from "react"
import { NavLink, Link, useOutletContext } from "react-router-dom"
export default function Home() {
  
  const {cardList,structure,favorites} = useOutletContext()
  const [search,setSearch] = useState('')
  const searchedList = cardList.filter(card=>card.title.toLowerCase().includes(search.toLowerCase()))
  return (
    <>
      <h2>HOME</h2>
      <div id = 'favorites'>
        {Object.values(favorites).map(fav=><Link className="nav-link" to={`/c/${fav.category}/t/${fav.topic}`} key={fav.id}>{fav.topic}</Link>)}
      </div>
      <div id = 'search'>
        <input type='search' value={search} onChange={e=>setSearch(e.target.value)}></input>
        <ul>
          {searchedList.map(card=><div key={card.id}><NavLink to={`/n/${card.id}`}>{card.title}</NavLink> <br /></div>)}
        </ul>
      </div>
    </>
  )
  
}