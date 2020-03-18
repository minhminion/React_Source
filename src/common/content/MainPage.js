import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Routes from '../routes'
import Modal from '../components/widgets/Modal'
import PageLoading from '../components/widgets/PageLoading'
import ProgressLoading from '../components/widgets/ProgressLoading'
import Loading from '../components/widgets/Loading'
import userHandler from '../../modules/user/handlers'

const MainPage = (props) => {
  const [loading, setLoading] = useState(false)

  const { user, getUser, store } = props

  const checkUser = useCallback( async () => {
      if (user && user.id) {
        try {
          await getUser(user.id)
          setLoading(false)
        } catch (err) {
          console.log('======== Bao Minh: getUser -> err', err)
        }
      }
    },
    [user, getUser],
  )
    
  useEffect(() => {
    checkUser()
  },[checkUser])

    if (loading) {
      return <Loading />
    }
    return (
      <>
        <BrowserRouter>
          <Routes store={store} />
        </BrowserRouter>
        <ProgressLoading.Component />
        <PageLoading.Component type='bars' />
        <Modal.Component global />
      </>
    )
}

export default connect(
  (state) => {
    return {
      user: state.user ? (state.user.user || {}) : {}
    }
  }, (dispatch, props) => ({
    dispatch,
    ...userHandler(dispatch, props)
  })
)(MainPage)
