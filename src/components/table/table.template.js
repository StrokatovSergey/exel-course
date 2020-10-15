const CODES = {
  A: 65,
  Z: 90
}

function createRow(content, index) {
  const resizer = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="row">
        <div class="row-info">
            ${index ? index : ''}
            ${resizer}
        </div>
        <div class="row-data">${content}</div>
    </div>
  `
}

function toColumn(col) {
  return `
    <div class="column">
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function toCell() {
  return `
    <div class="cell" contenteditable=""></div>
  `
}

const toChar = (i) => String.fromCharCode(CODES.A + i)

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map((_, i) => toChar(i))
      .map(toColumn)
      .join('')

  rows.push(createRow(cols, null))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('')
    rows.push(createRow(cells, i + 1))
  }


  return rows.join('')
}
