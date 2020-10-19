import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {shouldResize, isCell, isSwiftTouched} from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {resizeHandler} from '@/components/table/table.resize';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
    this.prepare()
  }

  toHTML() {
    return createTable(20)
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)
  }

  onMousedown(event) {
    const $target = $(event.target)
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)

    } else if (isCell(event) && !isSwiftTouched(event)) {
      this.selection.select($target)

    } else if (isSwiftTouched(event)) {
      this.selection.selectGroup($target)
    }

  }
}
