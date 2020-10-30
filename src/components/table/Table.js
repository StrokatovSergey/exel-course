import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {
  shouldResize,
  isCell,
  matrix,
  nextSelector
} from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {resizeHandler} from '@/components/table/table.resize';
import {$} from '@core/dom';
import * as actions from '@/redux/actions';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
    this.prepare()
  }

  toHTML() {
    return createTable(20, this.store.getState())
  }

  prepare() {
    this.selection = new TableSelection()
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell)
    this.$on('formula:input', text => {
      this.selection.current.text(text)
      this.updateCurrentTextInStore(text)
    })
    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
    this.$subscribe((state) => {
      console.log('tablestate', state);
    })
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event)
      this.$dispath(actions.tableResize(data))
    } catch (e) {
      console.log('error', e)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix(this.selection.current, $target).map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
      }
    }
    this.$dispath({type: 'test'})
  }

  onKeydown(event) {
    const keys = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'Enter', 'Tab']
    const {key} = event
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }

  updateCurrentTextInStore(value) {
    this.$dispath(actions.changeText({
      value,
      id: this.selection.current.id()
    }))
  }

  onInput(event) {
    // this.$emit('table:input', $(event.target))
    this.updateCurrentTextInStore($(event.target).text())
  }
}


