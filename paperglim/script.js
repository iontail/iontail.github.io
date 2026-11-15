// Open collapsed setup guides reached through a section link.
function focusGuide(hash = location.hash) {
  const guide = document.getElementById(hash.slice(1))
  if (!(guide instanceof HTMLDetailsElement)) return
  guide.open = true
  guide.setAttribute('tabindex', '-1')
  guide.focus({ preventScroll: true })
}
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => focusGuide(link.hash))
})
window.addEventListener('hashchange', () => focusGuide())
focusGuide()
