import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribers = []
    this.store = options.store
    this.storeSub = null

    this.prepare()
  }

  // настраиваем наш компонент до init
  prepare() {

  }

  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }

  // уведомляем слушателей про событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  $dispath(action) {
    this.store.dispatch(action)
  }

  $subscribe(fn) {
    this.storeSub = this.store.subscribe(fn)
  }

  // подписываемся на событие event
  $on(event, ...args) {
    const unsub = this.emitter.subscribe(event, ...args)
    this.unsubscribers.push(unsub)
  }

  // инициализируем компонент
  // добавляем DOM слушателеф
  init() {
    this.initDOMListeners()
  }

  // удаляем компонент
  // чистим слушатели
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
    this.storeSub.unsubscribe()
  }
}
