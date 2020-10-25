export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // dispatch trigger fire
  // уведомляю слушателей если они есть
  // 'formula:done'
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }

    this.listeners[event].forEach(listener => {
      listener(...args)
    })
  }
  // подписываюс на уведомления
  // добавляю нового слушателя
  // formuila.subscribe('table:select', () =>{})
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] = this.listeners[event].filter(listener => listener !== fn)
    }
  }
}
