import React, { useState } from "react";

interface Item {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
}

interface ItemProps {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
}

export default function App() {
  const [items, setItems] = useState<Item[]>([]);

  function addItem(newItem: Item) {
    setItems((items) => [...items, newItem]);
  }

  function deleteItem(id: number) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function changePackedItem(id: number) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={addItem} />
      <Packlist
        items={items}
        onDelete={deleteItem}
        onPacked={changePackedItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🧳 Travel list</h1>;
}

function Form({ onAddItem }: { onAddItem: (item: Item) => void }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(event: any) {
    event.preventDefault();
    if (!description) return;

    const newItem: Item = {
      id: Date.now(),
      description: description,
      quantity: quantity,
      packed: false,
    };
    console.log(newItem);
    onAddItem(newItem);

    // Reset form fields
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>what you need to your trip?</h3>
      <select
        onChange={(e) => setQuantity(Number(e.target.value))}
        value={quantity}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>add</button>
    </form>
  );
}

function Packlist({
  items,
  onDelete,
  onPacked,
}: { items: Item[] } & { onDelete: (id: number) => void } & {
  onPacked: (id: number) => void;
}) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <ItemInlist
            key={item.id}
            id={item.id}
            onDelete={onDelete}
            onPacked={onPacked}
            description={item.description}
            quantity={item.quantity}
            packed={item.packed}
          />
        ))}
      </ul>
      {/* <select name="" id="">
        <option value=""></option>
        <option value=""></option>
        <option value=""></option>
      </select> */}
    </div>
  );
}

function ItemInlist({
  id,
  description,
  quantity,
  packed,
  onDelete,
  onPacked,
}: ItemProps & { onDelete: (id: number) => void } & {
  onPacked: (id: number) => void;
}) {
  return (
    <li>
      <input
        type="checkbox"
        name=""
        id=""
        value={String(packed)}
        onChange={() => onPacked(id)}
      />
      <span style={packed ? { textDecoration: "line-through" } : {}}>
        {description}
      </span>
      -<span>{quantity}</span>
      <button onClick={() => onDelete(id)}>❌</button>
    </li>
  );
}

function Stats({ items }: { items: Item[] }) {
  if (!items.length) {
    return <p className="stats">you didn't packed yet let's start 😡</p>;
  }
  const itemsNumber: number = items.length;
  const packedItems: number = items.filter((item) =>
    item.packed ? item : ""
  ).length;

  const persents: number = (100 / itemsNumber) * packedItems;

  return (
    <footer className="stats">
      <em>
        {persents === 100
          ? "you are the best let's fly ✈️"
          : `💼 you have ${itemsNumber} items and you packed only ${packedItems}
      ${"(" + Math.floor(persents) + "%)"}`}
      </em>
    </footer>
  );
}
