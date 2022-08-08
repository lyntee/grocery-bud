import React, { useRef, useState } from "react";
import {FiEdit} from "react-icons/fi";
import { MdDelete} from "react-icons/md";

function App() {
  // Hook
  const [isEditing, setIsEditing] = useState(false);
  const refInputItem = useRef(null);
  const [newItems, setNewItems] = useState([]);
  const [editId, setEditId] = useState("");

  // Event - add item to list
  const addItem = (e) => {
    e.preventDefault();
    const newItem = {
      id: new Date().getTime().toString(),
      desc: refInputItem.current.value
    };
    setNewItems([...newItems, newItem]);
    refInputItem.current.value = null;
  };

  // Component - List 
  const List = () => {
    // Event - clear all items
    const clearItems = () => {
      setNewItems([]);
    };
    return (
      <section className="list">
        <ListItem />
        <input type="button" value="Clear items" onClick={clearItems}/>
      </section>
    );
  };

  // Event - when edit button is clicked
  const updateItem = () => {
    const updatedItems = newItems.map( (item) => {
      if(item.id === editId) {
        item.desc = refInputItem.current.value;
      }
      return item;
    });
    setNewItems(updatedItems);
    refInputItem.current.value = null;
    setIsEditing(false);
    // setEditId("");
  };

  // Component - ListItem
  const ListItem = () => {
    // Event - remove item from list
    const removeItem = (id) => {
      const filteredList = newItems.filter( (item) => item.id !== id);
      setNewItems(filteredList);
    };

    // Event - when edit icon is clicked
    const editItem = (desc, id) => {
      setIsEditing(true);
      refInputItem.current.value = desc;
      setEditId(id);
    };

    const items = newItems.map( (item) => {
      return (
        <section key={item.id} className="list-item">
          <p>{item.desc}</p>
          <article>
            <FiEdit onClick={() => editItem(item.desc, item.id)} />
            <MdDelete onClick={() => removeItem(item.id)} />
          </article>
        </section>
      )
    });
    return (
      <>
        {items}
      </>
    );
  };

  return (
    <main>
      <h2>Grocery Bud</h2>
      <form onSubmit={addItem}>
        <input type="text" placeholder="e.g. eggs" ref={refInputItem}/>
        {isEditing ? <input type="submit" value="Edit" onClick={updateItem}/> : <input type="submit" value="Submit" />}
      </form>
      <List />
    </main>
  );
}

export default App;
