import Link from 'next/link'
import React, { Component } from 'react'
import { ApolloProvider, ApolloClient, createNetworkInterface } from 'react-apollo'
import { Page } from '@shopify/polaris'

class App extends Component {
  render() {
    return (
        <Page
          title="My application"
          primaryAction={{ content: 'TODO' }}
          >
          <ul>
            <li><Link href='/shops'><a>Shops</a></Link></li>
            <li><Link href='/b' as='/a'><a>a</a></Link></li>
            <li><Link href='/a' as='/b'><a>b</a></Link></li>
          </ul>
        </Page>
    )
  }
}

export default props => (<App />)
