const
  { ApolloClient, InMemoryCache, HttpLink } = require('apollo-boost'),
  fetch = require('isomorphic-unfetch')

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser)
  global.fetch = fetch

function create (initialState) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri: process.env.GRAPHQL_URI,
      credentials: 'same-origin' // Additional fetch() options like `credentials` or `headers`
    }),
    cache: new InMemoryCache().restore(initialState || {})
  })
}

module.exports = function initApollo (initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) return create(initialState)

  // Reuse client on the client-side
  if (!apolloClient) apolloClient = create(initialState)

  return apolloClient
}
