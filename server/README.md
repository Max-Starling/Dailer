# GraphQL-MongoDB Backend

## Start the project

**Clone the project**: 
```git
git clone https://github.com/Max-Starling/GraphQL-MongoDB-Backend.git
```
**Create a database. You can do it via GUI like [MongoDB Compass](https://www.mongodb.com/products/compass), or by using [mongo shell](https://docs.mongodb.com/manual/mongo/)**:
```js
use your_db_name;   // create db or use existing one
db                  // display using db
```
**Create empty "post", "author" collections**:
```js
 db.createCollection(post)
 db.createCollection(author)
```

**Now open [src/config/index.js](./src/config/index.js) and change db configuration**:
```js
const config = {
  development: {
    /*...*/
    dbUrl: 'your_db_url',
    dbName: 'your_db_name'
    /*...*/
  }
};
```

**Install node modules inside cloned folder and start the project**:
```npm
npm install
npm start
```

## GraphQL usage

**To use GraphQL server you need to send POST request with specific header to the http://localhost:4000/graphql**:
```http
POST 
Content-Type: application/graphql
```
**You can do it outside the project (recommended) via tools like [Postman](https://www.getpostman.com/) or do it inside via packages like [axious](https://github.com/axios/axios):**
```js
const your_request_body = { /*...*/ };
axious.post("http://localhost:4000/graphql", your_request_body, {
    headers: { Content-Type: "application/graphql" }
});
```
**Now you can pass GraphQL [queries and mutations](https://graphql.org/learn/queries/) in the request body as text**.  

**"Author" and "Post" schemas look like**:
```typescript
type Author {
  _id: ID!
  name: String!
  posts: [Post]
}

type Post {
  _id: ID!
  title: String!
  authorId: ID
  author: Author
}
```

**Queries are used to get data**:
```GraphQL
// get posts
query {
 posts { _id, title, author { name } }
}

// get post by id
query {
 post(_id: "your_post_id") { _id, title }
}

// get authors
query {
 posts { _id, name, posts { title } }
}

// get author by id
query {
 author(_id: "your_author_id") { _id, name }
}
```
**Mutations are used to modify (create, update, delete) data**:
```GraphQL
// create author and return it
mutation {
 createAuthor(name: "your_author_name") { _id, name }
}

// update author and return it
mutation {
 updateAuthor(_id: "your_author_id", name: "your_new_author_name") { _id, name }
}

// delete author and return it
mutation {
 deleteAuthor(name: "your_author_name") { _id, name }
}

// create post and return it
mutation {
 createPost(authorId: "your_author_id", title: "your_post_title") { _id, title }
}

// update post and return it
mutation {
 updatePost(_id: "your_post_id", title: "your_new_post_title") { _id, title }
}

// delete post and return it
mutation {
 deletePost(_id: "your_post_id") { _id, title }
}
```

## Create new resources

**The first of all you need to create your new db collection**:
```js
 db.createCollection(your_new_collection)
```

**To manage this collection you need to create a new folder with appropriate name in the [src/resources folder](./src/resources). Then create resolvers, schema, service files inside. So the the resulting structure looks like**:
```
resources
- your_new_collection
-- your_new_collection.resolvers.js
-- your_new_collection.schema.js
-- your_new_collection.service.js
```
**"Schema" file exports string with common GraphQL schema containing types**:
```js
module.exports = `
 type Your_new_collection { /*...*/ }
 type Query { /*...*/ }
 type Mutation { /*...*/ }
`;
```
**"Resolvers" file exports object with common GrapQL resolvers containing methods inside of Query and Mutation**:
```js
module.exports = ({
  Query: {
    getSomething: (/*...*/) => { /*...*/ },
    /*...*/
  },

  Mutation: {
    changeSomething: (/*...*/) => { /*...*/ },
    /*...*/
  },
});
```
**Methods mentioned above call service working with DB and stored in "Service" file**:
```js
const createService = require('../../helpers/createService');

const service = createService('your_new_collection');

service.doSomething = (/*...*/) => { /*...*/ };

module.exports = service;
```
**More information about service usage you can find in [API Reference](./API.md)**.


