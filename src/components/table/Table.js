import {$} from '@core/dom'
import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners : ['mousedown', 'mousemove', 'mouseup']
    });
  }

  toHTML() {
    return createTable()
  }

  // onClick() {
  //   console.log('clickes table');
  // }
  //
  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target)
      const $parent = $resizer.closest('[data-type="resizable"]')
      const coordsParent = $parent.getCoords()

      document.onmousemove = e => {
        const delta = e.pageX - coordsParent.right
        const value = delta + coordsParent.width
        $parent.$el.style.width = value + 'px'
      }

      document.onmouseup = () => document.onmousemove = null
    }
  }

  onMousemove() {
    // console.log('onMousemove');
  }
  onMouseup() {
    // console.log('onMouseup');
  }
}
