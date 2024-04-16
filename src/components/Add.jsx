import {useState} from 'react'
import {useOutletContext } from 'react-router-dom'
import NoteForm from './NoteForm'

export default function Add() {
  
  const {cardList,setCardList} = useOutletContext()

  function handleSubmit(formData,setFormData,linkData){
    fetch('http://localhost:3000/Notes',{
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
        "Accept": "Application/JSON"
      },
      body: JSON.stringify({
        category: formData.category,
        topic: formData.topic,
        title: formData.title,
        text: formData.text,
        links: linkData,
      })
    })
    .then(r=>r.json())
    .then(newCard=>{
      alert("Your note has been added!")
      setCardList([...cardList,newCard])
      setFormData({
        category: "",
        topic: "",
        title: "",
        text: "",
      })
    })
  }

  return (
    <NoteForm 
    cardList={cardList} 
    card={{
      category: "",
      topic: "",
      title: "",
      text: "",
      links: [
        [],
        []
      ]
    }}
    onSubmit={handleSubmit}
    />
  )
}