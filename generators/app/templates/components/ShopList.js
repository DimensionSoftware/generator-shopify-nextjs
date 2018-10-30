import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { TextStyle, Heading, Page, Card, ResourceList } from '@shopify/polaris'
import ShopCreate from './ShopCreate'

export const shopsQuery = gql`
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

export const shopsQueryVars = {
  skip: 0,
  first: 10
}

export default function ShopList() {
  return (
    <Query query={shopsQuery} variables={shopsQueryVars}>
      {({ loading, error, data, fetchMore }) => {
        // guards
        if (error || !data.shopsConnection) return <h1>Error loading shops: {error}</h1>
        const
          shops = data.shopsConnection.edges.map(n => n.node) || [],
          aggregate = data.aggregate || {count: 0},
          areMoreShops = shops.length < aggregate.count
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
                  items={shops}
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
              <button onClick={() => loadMoreShops(shops, fetchMore)}>
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

function loadMoreShops(shops, fetchMore) {
  fetchMore({
    variables: {
      skip: shops.length
    },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (!fetchMoreResult) return previousResult
      return Object.assign({}, previousResult, {
        // Append the new shops results to the old one
        shops: [...previousResult.shops, ...fetchMoreResult.shops]
      })
    }
  })
}
