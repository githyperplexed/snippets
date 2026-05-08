import { deselect } from "./card";

const icons = ["shell", "turtle", "cat", "dog", "fish", "origami", "rabbit", "bird"] as const;

const colors = [
  "210, 170, 120",
  "80, 160, 80",
  "220, 130, 50",
  "200, 150, 60",
  "50, 130, 210",
  "220, 60, 60",
  "160, 100, 210",
  "80, 180, 210",
] as const;

const deck = document.querySelector<HTMLDivElement>(".deck")!;

export const determineDeckPosition = () => {
  const cards = deck.querySelectorAll<HTMLButtonElement>(".card");

  return cards.length;
}

export const repositionDeck = () => {
  const cards = Array.from(deck.querySelectorAll<HTMLButtonElement>('.card:not([data-hidden="true"])'));

  cards.forEach((card, index) => {
    card.style.setProperty("--card-index", (cards.length - 1 - index).toString());
    card.tabIndex = 0;
  });
}

const createIcon = (index: number) => {
  const img = document.createElement("img");
  img.src = `./assets/icons/${icons[index]}.svg`;
  img.alt = icons[index];
  return img;
}

export const createCard = (index: number) => {
  const card = document.createElement("button");

  const position = determineDeckPosition();

  card.classList.add("card");
  card.dataset.index = index.toString();
  card.style.setProperty("--card-index", position.toString());
  card.style.setProperty("--card-color", colors[index]);
  card.appendChild(createIcon(index));
  card.dataset.hidden = "true";

  card.onclick = () => removeCardFromDeck(index);

  return card;
}

export const showCard = (card: HTMLButtonElement) => {
  card.dataset.hidden = "false";
}

export const removeCardFromDeck = (index: number) => {
  const card = deck.querySelector<HTMLButtonElement>(`[data-index="${index}"]`);

  if (!card) return;

  card.dataset.hidden = "true";

  repositionDeck();

  deselect(index);

  setTimeout(() => card.remove(), 250);
}

export const addCardToDeck = (index: number) => {
  const card = createCard(index);

  deck.prepend(card);
  
  repositionDeck();

  setTimeout(() => showCard(card), 125);
}