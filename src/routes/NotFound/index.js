import { Loadable } from 'utils/components'

export default {
  component: Loadable({
    loader: () =>
      import(/* webpackChunkName: 'NotFound' */ './components/NotFoundPage'),
  })
}
