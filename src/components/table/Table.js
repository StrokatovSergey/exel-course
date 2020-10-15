import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      // listeners : ['click', 'mousedown', 'mousemove', 'mouseup']
    });
  }

  toHTML() {
    return createTable()
  }

  // onClick() {
  //   console.log('clickes table');
  // }
  //
  // onMousedown() {
  //   console.log('onMousedown');
  // }
  //
  // onMousemove() {
  //   console.log('onMousemove');
  // }
  // onMouseup() {
  //   console.log('onMouseup');
  // }
}
