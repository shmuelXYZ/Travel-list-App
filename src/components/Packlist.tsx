import React, { useState } from "react";
import { Item } from "../types";
import ItemInlist from "./Iteminlist";

export default function Packlist({
  items,
  onDelete,
  onPacked,
  onReset,
}: { items: Item[] } & { onDelete: (id: number) => void } & {
  onPacked: (id: number) => void;
} & { onReset: () => void }) {
  const [sortBy, setSortBy] = useState<string>("input");

  let sortedItems: Item[] = items;

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  else if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <ItemInlist
            key={item.id}
            id={item.id}
            onDelete={onDelete}
            onPacked={onPacked}
            // onReset={onReset}
            description={item.description}
            quantity={item.quantity}
            packed={item.packed}
          />
        ))}
      </ul>
      <div className="actions">
        <select
          value={sortBy}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSortBy(e.target.value)
          }
          id=""
        >
          <option value="input">sort by input order</option>
          <option value="packed">sort by packed item</option>
          <option value="description">sort by description</option>
        </select>
        <button onClick={onReset}>reset list</button>
      </div>
    </div>
  );
}
