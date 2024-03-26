export function closeModal() {
  const event = new CustomEvent('closeModal');
  document.body.dispatchEvent(event);
}
