import {$} from '@core/dom';

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const type = $resizer.data.resize
  let value

  $resizer.css({
    opacity: 1,
    zIndex: '1000'})

  if (type === 'col') {
    $resizer.css({
      height: '100vh'
    })
  } else {
    $resizer.css({
      width: '100vw'
    })
  }

  const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)

  document.onmousemove = e => {
    if (type === 'col') {
      const delta = e.pageX - coords.right
      value = coords.width + delta
      $resizer.css({right: -delta + 'px'})
    } else {
      const delta = e.pageY - coords.bottom
      value = coords.height + delta
      $resizer.css({bottom: -delta + 'px'})
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
    $resizer.css({
      opacity: '0',
      zIndex: 'auto'
    })

    if (type === 'col') {
      cells.forEach(el => el.style.width = value + 'px')
      $parent.css({width: value + 'px'})
      $resizer.css({
        height: 'auto',
        right: '0'
      })
    } else {
      $parent.css({height: value + 'px'})
      $resizer.css({
        width: 'auto',
        bottom: '0'
      })
    }
  }
}
