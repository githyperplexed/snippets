const container = document.querySelector<HTMLDivElement>(".container")!;

const cards = document.querySelectorAll<HTMLDivElement>(".card");

const setCardPosition = (row: string = "", column: string = "") => {
	container.style.setProperty("--card-row", row);
	container.style.setProperty("--card-column", column);
}

for (const card of cards) {
	card.onpointerenter = () => {
		setCardPosition(card.dataset.row, card.dataset.column);
	}

	card.onpointerleave = () => {
		setCardPosition();
	}
}