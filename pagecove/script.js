function focusGuide(hash = location.hash) {
  const guide = document.getElementById(hash.slice(1))
  if (!(guide instanceof HTMLDetailsElement)) return
  guide.open = true
  guide.setAttribute('tabindex', '-1')
  guide.focus({ preventScroll: true })
}
document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', () => focusGuide(link.hash)))
window.addEventListener('hashchange', () => focusGuide())
focusGuide()

const viewer = document.querySelector('.image-viewer')
let imageTrigger
if (viewer && typeof viewer.showModal === 'function') {
  document.querySelectorAll('.screen-open,.image-link').forEach(link => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    const image = new Image()
    viewer.querySelector('.viewer-image').replaceChildren(image)
    image.src = link.href
    image.alt = link.closest('figure')?.querySelector('img')?.alt || '논문 원문·번역·AI 대화 화면'
    imageTrigger = link
    viewer.showModal()
    image.decode().then(() => {
      const canvas = viewer.querySelector('.viewer-image')
      if (viewer.open) canvas.scrollLeft = (canvas.scrollWidth - canvas.clientWidth) / 2
    }).catch(() => {})
  }))
  viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close())
  viewer.addEventListener('click', event => { if (event.target === viewer && (event.clientY < viewer.getBoundingClientRect().top || event.clientY > viewer.getBoundingClientRect().bottom || event.clientX < viewer.getBoundingClientRect().left || event.clientX > viewer.getBoundingClientRect().right)) viewer.close() })
  viewer.addEventListener('close', () => imageTrigger?.focus({ preventScroll: true }))
}

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)')
const activeMotion = new Map()
function playMotion(element, keyframes, duration) {
  if (reducedMotion.matches || typeof element.animate !== 'function') return
  activeMotion.get(element)?.cancel()
  const animation = element.animate(keyframes, { duration, easing: 'cubic-bezier(.22,1,.36,1)' })
  activeMotion.set(element, animation)
  animation.finished.catch(() => {}).finally(() => {
    if (activeMotion.get(element) === animation) activeMotion.delete(element)
  })
}
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) for (const animation of activeMotion.values()) animation.cancel()
})

const mascot = document.querySelector('.mascot')
if (mascot) {
  const button = mascot.querySelector('.mascot-greet')
  const visual = mascot.querySelector('.mascot-visual')
  const otter = mascot.querySelector('.hero-otter')
  const pages = mascot.querySelector('.mascot-pages')
  const reply = mascot.querySelector('.mascot-reply')
  button.hidden = false
  let pointerFrame = 0
  mascot.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || reducedMotion.matches) return
    cancelAnimationFrame(pointerFrame)
    pointerFrame = requestAnimationFrame(() => {
      const bounds = mascot.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width - .5
      const y = (event.clientY - bounds.top) / bounds.height - .5
      visual.style.setProperty('--otter-x', `${x * 36}px`)
      visual.style.setProperty('--otter-y', `${y * 26}px`)
      visual.style.setProperty('--otter-angle', `${x * 8}deg`)
    })
  })
  mascot.addEventListener('pointerleave', () => {
    cancelAnimationFrame(pointerFrame)
    visual.style.removeProperty('--otter-x')
    visual.style.removeProperty('--otter-y')
    visual.style.removeProperty('--otter-angle')
  })
  otter.decode().then(() => {
    if (!reply.textContent && mascot.getBoundingClientRect().top < innerHeight) {
      playMotion(otter, [{ opacity: .45, transform: 'translateY(38px) scale(.91)' }, { opacity: 1, transform: 'none' }], 880)
    }
  }).catch(() => {})
  button.addEventListener('click', () => {
    reply.textContent = reply.textContent === '반가워요!' ? '같이 읽어요!' : '반가워요!'
    playMotion(otter, [
      { transform: 'none' },
      { transform: 'translateY(-28px) rotate(-6deg) scale(1.045)', offset: .35 },
      { transform: 'translateY(2px) rotate(2deg) scale(.995)', offset: .7 },
      { transform: 'none' }
    ], 720)
    playMotion(pages, [
      { opacity: 0, transform: 'translateY(70px) scale(.45)' },
      { opacity: 1, transform: 'translateY(-12px) scale(1)', offset: .5 },
      { opacity: 0, transform: 'translateY(-52px) scale(1.16)' }
    ], 840)
  })
}

const switcher = document.querySelector('.demo-switch')
if (switcher) {
  const shot = document.querySelector('.app-preview .product-shot')
  const image = shot.querySelector('img')
  const links = [...shot.querySelectorAll('a')]
  const caption = shot.querySelector('figcaption span')
  const buttons = [...switcher.querySelectorAll('button')]
  const originals = [image, document.querySelector('#reading .detail-shot img'), document.querySelector('.learning .detail-shot img')]
  const previews = originals.map(({ src, alt }) => ({ src, alt }))
  for (const [index, button] of buttons.entries()) {
    button.addEventListener('click', () => {
      if (button.getAttribute('aria-pressed') === 'true') return
      const preview = previews[index]
      for (const candidate of buttons) candidate.setAttribute('aria-pressed', String(candidate === button))
      for (const link of links) link.href = preview.src
      image.src = preview.src
      image.alt = preview.alt
      caption.textContent = button.dataset.caption
      image.decode().then(() => {
        if (image.src === preview.src) playMotion(image, [
          { opacity: .5, clipPath: 'inset(0 68% 0 0)' },
          { opacity: 1, clipPath: 'inset(0 0 0 0)' }
        ], 510)
      }).catch(() => {})
    })
  }
  switcher.hidden = false
}

if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting) continue
      observer.unobserve(target)
      if (!target.contains(document.activeElement)) playMotion(target, [
        { opacity: .68, transform: 'translateY(16px)' },
        { opacity: 1, transform: 'none' }
      ], 680)
    }
  }, { threshold: .25 })
  for (const target of document.querySelectorAll('.detail-shot')) observer.observe(target)
}
