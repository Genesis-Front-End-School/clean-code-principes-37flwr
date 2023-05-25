export const handleClick = (key: string) => {
  let newEvent = new KeyboardEvent('keydown', { key: key, ctrlKey: true });
  window.dispatchEvent(newEvent);
};
