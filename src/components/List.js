import React from "react";
import ListItem from "./ListItem";
import { useGlobalContext } from "../context";

const List = () => {
  // Hook
  const { clearItems } = useGlobalContext();

  return (
    <section className="list">
      <ListItem />
      <input type="button" value="Clear items" onClick={clearItems}/>
    </section>
  );
};

export default List;