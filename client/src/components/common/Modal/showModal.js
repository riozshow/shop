export function showModal(Component, title) {
  const event = new CustomEvent('showModal', {
    detail: { Component, title },
  });
  document.body.dispatchEvent(event);
}
