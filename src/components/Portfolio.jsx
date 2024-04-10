import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Portfolio() {
  const [portfolioList,setPortfolioList] = useState([])
  useEffect(()=>{
    fetch('http://localhost:3000/portfolios')
    .then(r=>r.json())
    .then(data=>setPortfolioList(data))
  },[])
  return (
    <>
      {portfolioList.map(portfolio=>(
        <Link 
        key = {portfolio.id} 
        to = {`/about/portfolio/${portfolio.id}`} >
          {portfolio.name}
        </Link>
      ))}
    </>
  )
}