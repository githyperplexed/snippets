const { createIcons, Zap, Mountain, Rocket, Heart, Star, Palette } = lucide;

createIcons({
  icons: {
    Zap,
    Mountain,
    Rocket,
    Heart,
    Star,
    Palette
  }
});

const cards = document.getElementById("cards");

if (cards) {
  cards.onmousemove = e => {
    for(const card of document.getElementsByClassName("card")) {
      const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };
  }
}
