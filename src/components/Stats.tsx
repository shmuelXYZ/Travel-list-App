import React from "react";
import { Item } from "../types/index";

export default function Stats({ items }: { items: Item[] }) {
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
