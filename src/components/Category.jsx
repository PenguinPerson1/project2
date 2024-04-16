import { NavLink, useParams, Outlet, useOutletContext } from 'react-router-dom'


export default function Category(){
  const params = useParams()
  const {cardList,structure,favorites,setFavorites} = useOutletContext()
  const categoryCards = cardList.filter(card=>card.category===params.category)
  return(
    <>
      <h1>Category {params.category}</h1>
      {Object.keys(structure[params.category]).map((topic,i)=>(
        <NavLink className="nav-link" key={i} to={`/c/${params.category}/t/${topic}`} >{topic}</NavLink>
      ))}
      <Outlet context={{categoryCards:categoryCards,structure:structure[params.category],favorites:favorites,setFavorites:setFavorites}} />
    </>
  )
}