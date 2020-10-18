import {resizeHandler} from '@/components/table/table.resize';

export function shouldResize($root, event) {
  if (event.target.dataset.resize) {
    resizeHandler($root, event)
  }
}
