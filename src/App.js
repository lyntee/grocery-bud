import React from "react";
import List from "./components/List";
import { useGlobalContext } from "./context";

function App() {
  // Hook
  const { addItem, refInputItem, isEditing, updateItem } = useGlobalContext();

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
