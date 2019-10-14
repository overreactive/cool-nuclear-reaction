import { LIST_PATH } from 'constants/paths'
import { Loadable } from 'utils/components'

export default {
  path: LIST_PATH,
  component: Loadable({
    loader: () =>
      import(/* webpackChunkName: 'Projects' */ './components/ProjectsPage')
  })
}
