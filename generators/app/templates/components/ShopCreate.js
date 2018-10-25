// XXX what follows is an _example_ wiring up a mutation
// - upserting Shops directly does not make sense

import { ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'
import { shopsQuery, shopsQueryVars } from './ShopList'

export default function ShopCreate () {
  return (
    <ApolloConsumer>
      {client => (
        <form onSubmit={event => handleCreate(event, client)}>
          <hr size={1} />
          <input placeholder='domain' name='domain' type='text' required />
          <input placeholder='accessToken' name='accessToken' type='accessToken' required />
          <button type='submit'>Create Shop</button>
        </form>
      )}
    </ApolloConsumer>
  )
}

function handleCreate (event, client) {
  event.preventDefault()
  const
    form        = event.target,
    formData    = new window.FormData(form),
    domain      = formData.get('domain'),
    accessToken = formData.get('accessToken')
  form.reset()

  client.mutate({
    mutation: gql`
      mutation createShop($domain: String!, $accessToken: String!) {
        createShop(domain: $domain, accessToken: $accessToken) {
          id
          domain
          accessToken
          createdAt
        }
      }
    `,
    variables: { domain, accessToken },
    update: (proxy, { data: { createShop } }) => {
      const data = proxy.readQuery({
        query: shopsQuery,
        variables: shopsQueryVars
      })
      proxy.writeQuery({
        query: shopsQuery,
        data: {
          ...data,
          shops: [createShop, ...data.shops]
        },
        variables: shopsQueryVars
      })
    }
  })
}
