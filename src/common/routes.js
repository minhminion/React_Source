import React from 'react'
import { Route, Switch } from 'react-router'
import MainLayout from './content/MainLayout'
import UnderContruct from '../pages/UnderContruct'
import RegisterModal from '../modules/user/containers/RegisterModal'

const Routes = (props) => {

  const { store } = props
  let { user } = store.getState()
  user = user || {}
  /** If use is not exists => not login then show mot found page */
  if (!user.user || !user.user.id) {
    return (
      <Switch>
        <Route path='*' key='login' component={RegisterModal} />
        {/* <Route path='*' component={UnderContruct} /> */}
      </Switch>
    )
  }
  /** Case user is login */
  if (user && user.user) {
    return (
      <MainLayout>
        <Switch>
          <Route path='*' component={UnderContruct} />
        </Switch>
      </MainLayout>
    )
  }

  return <Route path='*' component={UnderContruct} />
}

export default Routes
