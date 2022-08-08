import React from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useGlobalContext } from "../context";

const ListItem = () => {
  // Hook
  const { removeItem, editItem, newItems } = useGlobalContext();

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

export default ListItem;
