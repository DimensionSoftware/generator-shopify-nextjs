import React from 'react'
import Link from 'next/link'

export default () => (
  <div className="container">
    <header>
      <h1>Shopify Node App – Installation</h1>
      <p className="subhead">
        <label>Enter your shop domain to log in or install this app.</label>
      </p>
    </header>

    <div className="container__form">
      <form method="GET" action="/shopify/auth">
        <input type="text" name="shop" id="shop" placeholder="example.myshopify.com"/>
        <button type="submit">Install</button>
      </form>
    </div>
  </div>
)
