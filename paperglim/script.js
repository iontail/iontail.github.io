// Keep the first-open guide visible when reached through an installation link.
function focusGuide() {
  if (location.hash !== '#first-open') return
  const guide = document.getElementById('first-open')
  guide.setAttribute('tabindex', '-1')
  guide.focus({ preventScroll: true })
}
window.addEventListener('hashchange', focusGuide)
focusGuide()
