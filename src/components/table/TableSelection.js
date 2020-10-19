export class TableSelection {
  constructor() {
    this.group = []
  }

  select($el) {
    if (this.group[0]) {
      const $prevSelectedCol = this.group[0]
      $prevSelectedCol.removeClass('selected')
      this.group[0] = $el
    } else {
      this.group.push($el)
    }
    $el.addClass('selected')
  }

  selectGroup() {

  }
}
