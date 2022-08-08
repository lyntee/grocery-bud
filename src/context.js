import React, { useContext, useState, useRef } from 'react';

const AppContext = React.createContext();

const AppProvider = ({children}) => {
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
  };

  // Event - clear all items
   const clearItems = () => {
    setNewItems([]);
  };

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

  return (
    <AppContext.Provider value={ 
      { 
        isEditing,
        refInputItem,
        newItems,
        addItem,
        updateItem,
        clearItems,
        removeItem,
        editItem
      }
     }>
      {children}
    </AppContext.Provider>);
}

const useGlobalContext = () => {
  return useContext(AppContext);
}

export { AppProvider, useGlobalContext };
