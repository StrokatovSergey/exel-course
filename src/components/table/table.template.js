const CODES = {
  A: 65,
  Z: 90
}
const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function toCell(state, row) {
  return function(_, index) {
    const id = `${row}:${index}`
    const textValue = state.dataState[id] || ''
    const width = getWidth(state.colState, index)
    return `<div 
              class="cell" 
              contenteditable
              data-col="${index}" 
              data-id="${id}"
              data-type="cell"
              style="width: ${width}"
            >${textValue}</div>`
  }
}

function toColumn({col, index, width}) {
  return `
    <div class="column" data-type="resizable" data-col="${index}" style="width: ${width}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(index, content, rowState) {
  const height = getHeight(rowState, index)
  const dataRow = index > 0 ? `data-row="${index}"` : null
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="row" data-type="resizable" ${dataRow} style="height: ${height}">
      <div class="row-info">
        ${index ? index : ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function getWidth(colState, index) {
  return (colState[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(rowState, index) {
  return (rowState[index] || DEFAULT_HEIGHT) + 'px'
}


function withWidthFrom(state) {
  return function(col, index) {
    return {
      col, index, width: getWidth(state.colState, index)
    }
  }
}


export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1 // Compute cols count
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('')

  rows.push(createRow(null, cols, {}))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(state, row))
        .join('')

    rows.push(createRow(row + 1, cells, state.rowState))
  }
  rows.push()

  return rows.join('')
}
