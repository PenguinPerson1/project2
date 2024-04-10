import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';

export default function PortfolioItem() {
  const [portfolio,setPortfolio] = useState({})
  const params = useParams();
  useEffect(()=>{
    fetch(`http://localhost:3000/portfolios/${params.id}`)
    .then(r=>r.json())
    .then(data=>setPortfolio(data))
  },[])
  return (
    <h1>{portfolio.name}</h1>
  )
}