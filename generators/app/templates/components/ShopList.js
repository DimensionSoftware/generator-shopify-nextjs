import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Page } from '@shopify/polaris'
import ShopCreate from './ShopCreate'

export const allShopsQuery = gql`
  query allShops($first: Int!, $skip: Int!) {
    allShops(orderBy: createdAt_DESC, first: $first, skip: $skip) {
      id
      domain
      accessToken
      createdAt
    }
    _allShopsMeta {
      count
    }
  }
`

export const allShopsQueryVars = {
  skip: 0,
  first: 10
}

export default function ShopList () {
  return (
    <Query query={allShopsQuery} variables={allShopsQueryVars}>
      {({ loading, error, data, fetchMore }) => {
        // guards
        if (error) return <h1>Error loading shops: {error}</h1>
        if (loading) return <div>Loading</div>
        const
          allShops = data.allShops || [],
          _allShopsMeta = data._allShopsMeta || {count: 0},
          areMoreShops = allShops.length < _allShopsMeta.count
        return (
          <Page
            title="My application"
            breadcrumbs={[{ content: 'Home', url: '/' }]}
            >
            <h2>Shops List</h2>
            <ul>
              {allShops.length && allShops.map((shop, ndx) => (
                <li key={shop.id}>
                  <span>{shop.domain}</span>
                  <span>{shop.accessToken}</span>
                </li>
              )) || '( empty list )'}
            </ul>
            {areMoreShops ? (
              <button onClick={() => loadMoreShops(allShops, fetchMore)}>
                {' '}
                {loading ? 'Loading...' : 'Show More'}{' '}
              </button>
            ) : (
              ''
            )}
            <ShopCreate />
          </Page>
        )
      }}
    </Query>
  )
}

function loadMoreShops (allShops, fetchMore) {
  fetchMore({
    variables: {
      skip: allShops.length
    },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (!fetchMoreResult) return previousResult
      return Object.assign({}, previousResult, {
        // Append the new shops results to the old one
        allShops: [...previousResult.allShops, ...fetchMoreResult.allShops]
      })
    }
  })
}
