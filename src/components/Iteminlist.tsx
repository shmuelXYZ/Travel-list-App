import React from "react";
import { ItemProps } from "../types";

export default function ItemInlist({
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
