import bird from "$lib/assets/icons/bird.svg";
import cat from "$lib/assets/icons/cat.svg";
import dog from "$lib/assets/icons/dog.svg";
import fish from "$lib/assets/icons/fish.svg";
import origami from "$lib/assets/icons/origami.svg";
import rabbit from "$lib/assets/icons/rabbit.svg";
import shell from "$lib/assets/icons/shell.svg";
import turtle from "$lib/assets/icons/turtle.svg";

export type CardData = {
	index: number;
	name: string;
	icon: string;
	color: string;
};

export const cards: CardData[] = [
	{ index: 0, name: "shell", icon: shell, color: "76.3% 0.081 72.3" },
	{ index: 1, name: "turtle", icon: turtle, color: "63.6% 0.140 143.7" },
	{ index: 2, name: "cat", icon: cat, color: "69.0% 0.143 58.0" },
	{ index: 3, name: "dog", icon: dog, color: "70.4% 0.121 79.0" },
	{ index: 4, name: "fish", icon: fish, color: "59.7% 0.144 251.6" },
	{ index: 5, name: "origami", icon: origami, color: "59.6% 0.197 25.5" },
	{ index: 6, name: "rabbit", icon: rabbit, color: "61.5% 0.168 307.3" },
	{ index: 7, name: "bird", icon: bird, color: "72.2% 0.102 220.7" }
];
