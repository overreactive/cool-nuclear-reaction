import { Loadable } from 'utils/components'
import { ACCOUNT_PATH } from 'constants/paths'

export default {
  path: ACCOUNT_PATH,
  component: Loadable({
    loader: () =>
      import(/* webpackChunkName: 'Account' */ './components/AccountPage')
  })
}
