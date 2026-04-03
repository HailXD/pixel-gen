const $ = (s) => document.querySelector(s)

const MAX_CHANNEL = 255
const MIN_SIZE = 1
const DEFAULT_FILE = "rgba-image.png"

const form = $("#generator-form")
const canvas = $("#preview")
const meta = $("#meta")
const rgbaText = $("#rgba-text")

const fields = {
  width: $("#width"),
  height: $("#height"),
  red: $("#red"),
  green: $("#green"),
  blue: $("#blue"),
  alpha: $("#alpha"),
}

const clamp = (n, min, max) => Math.min(max, Math.max(min, n))

const readInt = (input, min, max) => {
  const value = Number.parseInt(input.value, 10)
  const safe = Number.isNaN(value) ? min : clamp(value, min, max)
  input.value = safe
  return safe
}

const draw = () => {
  const width = readInt(fields.width, MIN_SIZE, Number.MAX_SAFE_INTEGER)
  const height = readInt(fields.height, MIN_SIZE, Number.MAX_SAFE_INTEGER)
  const red = readInt(fields.red, 0, MAX_CHANNEL)
  const green = readInt(fields.green, 0, MAX_CHANNEL)
  const blue = readInt(fields.blue, 0, MAX_CHANNEL)
  const alpha = readInt(fields.alpha, 0, MAX_CHANNEL)

  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext("2d")
  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha / MAX_CHANNEL})`
  ctx.fillRect(0, 0, width, height)

  meta.textContent = `${width} x ${height}px`
  rgbaText.textContent = `rgba(${red}, ${green}, ${blue}, ${(alpha / MAX_CHANNEL).toFixed(3)})`
}

const download = () => {
  const link = document.createElement("a")
  link.href = canvas.toDataURL("image/png")
  link.download = DEFAULT_FILE
  link.click()
}

form.addEventListener("input", draw)
form.addEventListener("submit", (event) => {
  event.preventDefault()
  draw()
  download()
})

draw()
