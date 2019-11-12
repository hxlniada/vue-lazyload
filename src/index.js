import Lazy from './lazy'
import LazyComponent from './lazy-component'
import LazyContainer from './lazy-container'
import LazyImage from './lazy-image'

export default {
  /*
  * install function
  * @param  {Vue} Vue
  * @param  {object} options  lazyload options
  */
  install (Vue, options = {}) {
    const LazyClass = Lazy(Vue)
    const lazy = new LazyClass(options)
    const lazyContainer = new LazyContainer({ lazy })

    Vue.prototype.$Lazyload = lazy

    if (options.lazyComponent) {
      Vue.component('lazy-component', LazyComponent(lazy))
    }

    if (options.lazyImage) {
      Vue.component('lazy-image', LazyImage(lazy))
    }

    Vue.directive('lazy', {
      bind: lazy.add.bind(lazy),
      update: lazy.update.bind(lazy),
      componentUpdated: lazy.lazyLoadHandler.bind(lazy),
      unbind: lazy.remove.bind(lazy)
    })
    Vue.directive('lazy-container', {
      bind: lazyContainer.bind.bind(lazyContainer),
      componentUpdated: lazyContainer.update.bind(lazyContainer),
      unbind: lazyContainer.unbind.bind(lazyContainer)
    })
  }
}
