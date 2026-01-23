export const get = (selector: string) => {
  const element = document.querySelector(selector);

  if (!element) throw new Error(`Element not found: ${selector}`);

  return element;
};

export const getPosition = (selector: string) => {
  const element = get(selector);

  const rect = element.getBoundingClientRect();

  return {
    x: rect.left,
    y: rect.top,
  };
};