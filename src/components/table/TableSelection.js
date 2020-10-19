export class TableSelection {
  constructor() {
    this.group = []
  }

  select($el) {
    console.log('$el', $el);
    this.group.push($el)
    $el.addClass('selected')
  }

  selectGroup() {

  }
}
