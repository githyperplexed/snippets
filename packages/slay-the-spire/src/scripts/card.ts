import { addCardToDeck } from "./deck";

export const container = document.querySelector<HTMLDivElement>(".card-container")!;
export const cards = container.querySelectorAll<HTMLDivElement>(".card-container .card");

export const getCardByIndex = (index: number) => {
  return container.querySelector<HTMLDivElement>(`[data-index="${index}"]`);
}

export const select = (card: HTMLDivElement) => {
  const index = parseInt(card.dataset.index || "-1");

  if (index === -1) return;

  card.dataset.selected = "true";

  card.inert = true;

  addCardToDeck(index);
}

export const deselect = (index: number) => {
  const card = getCardByIndex(index);

  if (!card) return;

  card.removeAttribute("data-selected");

  card.inert = false;
}