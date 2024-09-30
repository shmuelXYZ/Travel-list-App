import React, { useState } from "react";
import { Item } from "../types/index";

export default function Form({
  onAddItem,
}: {
  onAddItem: (item: Item) => void;
}) {
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
