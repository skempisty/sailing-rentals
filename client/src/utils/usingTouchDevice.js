export default function usingTouchDevice() {
  return ('ontouchstart' in document.documentElement)
}
