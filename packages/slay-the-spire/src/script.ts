import "./scripts/card";
import "./scripts/deck";

import { cards, select } from "./scripts/card";

for (const card of cards) {
  card.onclick = () => select(card);
}