import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners : ['mousedown']
    });
  }

  toHTML() {
    return createTable()
  }

  // onClick() {
  //   console.log('clickes table');
  // }
  //
  onMousedown(e) {
    if (e.target.dataset.resize) {
      console.log(`resize ${e.target.dataset.resize}`);
    }
  }
  //
  // onMousemove() {
  //   console.log('onMousemove');
  // }
  // onMouseup() {
  //   console.log('onMouseup');
  // }
}
