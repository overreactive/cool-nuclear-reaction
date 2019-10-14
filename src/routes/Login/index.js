import { Loadable } from 'utils/components'
import { LOGIN_PATH } from 'constants/paths'

export default {
  path: LOGIN_PATH,
  component: Loadable({
    loader: () =>
      import(/* webpackChunkName: 'Login' */ './components/LoginPage')
  })
}
