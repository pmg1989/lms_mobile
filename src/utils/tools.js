export function renderBgImage (url) {
  return {
    background: `url('${url}') no-repeat center center`,
    backgroundSize: 'cover',
  }
}

export function parseTime (time) {
  let min = String(parseInt(time / 60, 10))
  let sec = String(parseInt(time % 60, 10))
  if (min.length === 1) {
    min = `0${min}`
  }
  if (sec.length === 1) {
    sec = `0${sec}`
  }
  return `${min}:${sec}`
}
