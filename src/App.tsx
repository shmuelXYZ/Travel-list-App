import React, { useState } from "react";

interface Item {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
}

const initialItems: Item[] = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Chargher", quantity: 1, packed: true },
];

interface ItemProps {
  // id: number;
  description: string;
  quantity: number;
  packed: boolean;
}

export default function App() {
  const [items, setItems] = useState<Item[]>([]);

  function addItem(newItem: Item) {
    setItems((items) => [...items, newItem]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={addItem} />
      <Packlist items={items} />
      <Stats />
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

function ItemInlist(props: ItemProps) {
  return (
    <li>
      <span style={props.packed ? { textDecoration: "line-through" } : {}}>
        {props.description}
      </span>
      -<span>{props.quantity}</span>
      <button>❌</button>
    </li>
  );
}

function Packlist({ items }: { items: Item[] }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <ItemInlist
            key={item.id}
            description={item.description}
            quantity={item.quantity}
            packed={item.packed}
          />
        ))}
      </ul>
    </div>
  );
}

function Stats() {
  return (
    <footer className="stats">
      💼 you have X items and you packed only X (X%)
    </footer>
  );
}
