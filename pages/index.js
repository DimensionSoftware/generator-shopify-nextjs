import Link from 'next/link'
import React, { Component } from 'react'
import { Page, AppProvider } from '@shopify/polaris'

import '@shopify/polaris/styles.css'

class App extends Component {
  render() {
    const { apiKey, shopOrigin } = typeof(window) !== 'undefined' ? window : { apiKey: '', shopOrigin: '' }

    return (
      <AppProvider shopOrigin={shopOrigin} apiKey={apiKey}>
        <Page
          title="My application"
          breadcrumbs={[{ content: 'Home', url: '/a' }]}
          primaryAction={{ content: 'Add something' }}
          >
          <ul>
            <li><Link href='/b' as='/a'><a>a</a></Link></li>
            <li><Link href='/a' as='/b'><a>b</a></Link></li>
          </ul>
        </Page>
      </AppProvider>
    )
  }
}

export default App
