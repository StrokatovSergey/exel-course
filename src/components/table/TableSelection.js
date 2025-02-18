export class TableSelection {
  static className = 'selected'
  constructor() {
    this.group = []
    this.current = null
  }

  select($el) {
    this.clear()
    this.group.push($el)
    this.current = $el
    $el.focus()
    $el.addClass(TableSelection.className)
  }

  clear() {
    this.group.forEach($el => $el.removeClass(TableSelection.className))
  }

  selectGroup($group) {
    this.clear()
    this.group = $group
    this.group.forEach($el => $el.addClass(TableSelection.className))
  }
}
