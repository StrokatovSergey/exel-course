import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {$} from '@core/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
  }

  toHTML() {
    return createTable(20)
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target)
      const $parent = $resizer.closest('[data-type="resizable"]')
      const coords = $parent.getCoords()
      const type = $resizer.data.resize
      let value

      $resizer.css({
        opacity: 1,
        zIndex: '1000',
        height: '100vh'
      })

      const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`)

      document.onmousemove = e => {
        if (type === 'col') {
          const delta = e.pageX - coords.right
          value = coords.width + delta
          $resizer.css({right: -delta + 'px'})
        } else {
          const delta = e.pageY - coords.bottom
          const value = coords.height + delta
          $parent.css({height: value + 'px'})
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
        if (type === 'col') {
          cells.forEach(el => el.style.width = value + 'px')
          $parent.css({width: value + 'px'})
          $resizer.css({
            opacity: '0',
            zIndex: 'auto',
            height: 'auto',
            right: '0'
          })
        }
      }
    }
  }
}

// 589 msScripting
// 2433 msRendering

// 440 msScripting
// 1771 msRendering
