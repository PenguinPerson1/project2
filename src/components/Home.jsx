import { useState, useEffect } from "react"
import { useNavigate, NavLink, Link, useOutletContext } from "react-router-dom"
import { GridColumn, Grid, CardGroup, CardContent, Card, Input } from 'semantic-ui-react'
export default function Home() {
  
  const {cardList,structure,favorites} = useOutletContext()
  const [search,setSearch] = useState('')
  const searchedList = cardList.filter(card=>card.title.toLowerCase().includes(search.toLowerCase()))
  const favoriteCards  = Object.values(favorites).map(fav=> {return {
    as: Link,
    to: `/c/${fav.category}/t/${fav.topic}`,
    header: fav.topic,
    meta: fav.category
  }})
  const navigate = useNavigate();
  
  return (
    <Grid columns={2} divided relaxed padded>
      <GridColumn width={10} id='favories-container'>
        <h3>Favorite Topics</h3>
        <CardGroup items={favoriteCards} />
      </GridColumn>
      <GridColumn width={6} id='search-container'>
          <h3>Card Search</h3>
          <form onSubmit={()=>navigate(`/n/${searchedList[0].id}`,{ state: { prev: "home" } })}>
            <Input type='search' icon='search' placeholder='Search...' value={search} onChange={e=>setSearch(e.target.value)} />
          </form>
          <ul>
            {searchedList.map(card=><div key={card.id}><Link state={{ prev: "home" }} to={`/n/${card.id}`}>{card.title}</Link> <br /></div>)}
          </ul>
      </GridColumn>
    </Grid>

)}