import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { TextStyle, Heading, Page, Card, ResourceList } from '@shopify/polaris'
import ShopCreate from './ShopCreate'

export const allShopsQuery = gql`
  query ($first: Int!, $skip: Int!) {
    shopsConnection(orderBy: createdAt_DESC, first: $first, skip: $skip) {
      edges {
        node {
          id
          domain
          accessToken
          createdAt
        }
      }
      aggregate {
        count
      }
    }
  }
`

export const allShopsQueryVars = {
  skip: 0,
  first: 10
}

export default function ShopList() {
  return (
    <Query query={allShopsQuery} variables={allShopsQueryVars}>
      {({ loading, error, data, fetchMore }) => {
        // guards
        if (error) return <h1>Error loading shops: {error}</h1>
        const
          allShops = data.allShops || [],
          _allShopsMeta = data._allShopsMeta || {count: 0},
          areMoreShops = allShops.length < _allShopsMeta.count
        return (
          <Page
            title="My application"
            breadcrumbs={[{ content: 'Home', url: '/' }]}
            >
            <Heading>Shops List</Heading>
            <Card>
              {loading
                ? <div>Loading</div>
                : <ResourceList
                  items={allShops}
                  renderItem={shop =>
                    <ResourceList.Item
                      id={shop.id}
                      accessibilityLabel={`Details for ${shop.domain} ${shop.id}`}
                      >
                      <h3>
                        <TextStyle variation="strong">{shop.domain}</TextStyle>
                      </h3>
                      <div>{shop.accessToken}</div>
                    </ResourceList.Item>
                  }>
                </ResourceList>}
            </Card>
            {areMoreShops ? (
              <button onClick={() => loadMoreShops(allShops, fetchMore)}>
                {' '}
                {loading ? 'Loading...' : 'Show More'}{' '}
              </button>
            ) : (
              ''
            )}
          </Page>
        )
      }}
    </Query>
  )
}

function loadMoreShops(allShops, fetchMore) {
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
