import { Link, NavLink } from "react-router-dom";
import { MenuItem, Menu } from 'semantic-ui-react'

export default function NavBar({navLinks,type,addHome}) {
  return (
    <>
      {addHome && <Link id="site-title" to={'/'}><h1>Notes</h1></Link> }
      <Menu {...type}>
        {navLinks.map(n=><MenuItem key={n.id} as={NavLink} to={n.navi} name={n.name}/>)}
      </Menu>
    </>
  )
}