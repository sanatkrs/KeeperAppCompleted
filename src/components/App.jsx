import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);


  async function getNotes() {
    const response = await fetch("http://localhost:8080/", {
      method: 'GET'
    })

    const data = await response.json()

    setNotes(data)

  }

  // function addNote(newNote) {
  //   setNotes((prevValue) => {
  //     return [...prevValue, newNote];
  //   });
  // }

  async function deleteNote(id) {

    const response = await fetch('http://localhost:8080/delete', {
      method: 'POST',
      body: JSON.stringify({id}),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()
    setNotes(data)
    // setNotes((prevNotes) => {
    //   return prevNotes.filter((noteItem, index) => {
    //     return index !== id;
    //   });
    // });
  }


  useEffect(()=> {
    getNotes()
  }, [notes])


  return (
    <div>
      <Header />
      <CreateArea /> 
      {/* onAdd={addNote}  */}
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
