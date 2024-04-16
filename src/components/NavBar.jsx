import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <NavLink className="nav-link" to="/">Home</NavLink>
      <NavLink className="nav-link" to="/add">Add</NavLink>
    </div>
  )
}