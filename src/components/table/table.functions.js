import {range} from '@core/utils';

export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.type === 'cell'
}

export function matrix($current, $target) {
  const target = $target.id(true)
  const current = $current.id(true)
  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)
  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])
}

export function nextSelector(key, {row, col}) {
  const MIN_VALUE = 0
  switch (key) {
    case 'ArrowUp':
      row = row - 1 > MIN_VALUE ? --row : 0
      break
    case 'ArrowRight':
    case 'Tab':
      ++col
      break
    case 'ArrowDown':
    case 'Enter':
      ++row
      break
    case 'ArrowLeft':
      col = col - 1 > MIN_VALUE ? --col : 0
      break
  }
  return `[data-id="${row}:${col}"]`
}
