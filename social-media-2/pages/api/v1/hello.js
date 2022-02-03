const { default: Link } = require("next/link");

<Link 
href={{
  pathname='/api/v1/[a]/[username]',
  query: {name: "Jimmy"},
  slugs: ['a', 'username']
}}
/>

