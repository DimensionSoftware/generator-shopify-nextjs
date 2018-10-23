import App, {Container} from 'next/app'
import React from 'react'
import withApolloClient from '../lib/with-apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Page, AppProvider } from '@shopify/polaris'
import '@shopify/polaris/styles.css'

global.isClient = typeof(window) !== 'undefined'

class MyApp extends App {
  render () {
    const
      {apiKey, shopOrigin} = isClient ? window : {apiKey: '', shopOrigin: ''},
      {Component, pageProps, apolloClient} = this.props
    return (
      <Container>
        <AppProvider shopOrigin={shopOrigin} apiKey={apiKey}>
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
          </ApolloProvider>
        </AppProvider>
      </Container>
    )
  }
}

export default withApolloClient(MyApp)
