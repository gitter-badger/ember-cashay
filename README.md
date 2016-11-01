# ember-cashay

[![CircleCI](https://circleci.com/gh/dustinfarris/ember-cashay.svg?style=svg)](https://circleci.com/gh/dustinfarris/ember-cashay)

Use [Cashay](https://github.com/mattkrick/cashay) in your Ember project.


## Installation

```
ember install ember-cashay
```

ember-cashay and ember-redux rely on browserify to load npm packages.  For browserify to work, the host Ember app (your app) must explicitly install the dependencies.  When you `ember install ember-cashay`, this is done for you.

PhantomJS has limited support for certain ES6 features that are used by Cashay.  If you plan to use PhantomJS for testing, you will need to add the babel polyfill to your ember-cli-build.js:

```js
// ember-cli-build.js

var app = new EmberApp({
  babel: {
    includePolyfill: true
  }
});
```

If everything went well, you should have a GraphQL schema in `graphql/schema.js`.  Tailor this to suit your requirements.


## Configuration


### GraphQL Endpoint

You'll want to configure the GraphQL endpoint URL for your environment.

The default is `/graphql`.

Example:

```js
// config/environment.js
...
if (environment === 'production') {
  ENV['ember-cashay'] = {
    'graphql-endpoint': 'https://example.com/graphql'
  }
}
```


### Schema Location

If for some reason you don't like having your server schema in a `graphql/` directory, you can override this in your ember-cli-build.js.  ember-cashay will look for a `schema.js` in whatever directory you provide.

Example (if you wanted to keep the schema in `server/schema.js` instead):

```js
// ember-cli-build.js
var app = new EmberApp({
  'ember-cashay': {
    serverSchemaDirectory: 'server'
  }
});
```


## Usage

Once installed, you can use Cashay anywhere.

Import Cashay using browserify:

```js
import npmCashay from 'npm:cashay';

const { cashay } = npmCashay;
```


### Example query

```js
let { users } = cashay.query(`{ users { id, name } }`).data;
```


## License

MIT
