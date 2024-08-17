# Graphql Federation Demo

A basic demo of graphql federation that adheres to the v2 apollo federation spec using graphql-mesh, graphql-hive, and
 graphql-yoga.

The purpose of this demo is to provide a high level overview of how graphql federation works to facilitate a
 microservice architecture.

## How it works

The demo provides two _sub graphs_ (products and reviews) that are combined into a single _super graph_.

The __products__ sub graph implements the [products.graphql](./packages/products/products.graphql) schema, which for the purpose of the demo
 contains all `Product` fields except for `Product.reviews` and `Product.reviewSummary`.

The __reviews__ sub graph implements the [reviews.graphql](./packages/reviews/reviews.graphql) schema, which extend `Product` to add the
`Product.reviews` and `Product.reviewSummary` fields.

__Example__

| Products subgraph   | Reviews subgraph | Unified Product |
|---------------------|---------------|---------------------|
| id: ID!             | id: ID! @external | id: ID!             |
| description: String |               | description: String | 
| name: String        |               | name: String |
| price: Price        |               | price: Price |
|                     | reviews: [Review] | reviews: [Review] |
|                     | reviewSummary: ReviewSummary | reviewSummary: ReviewSummary |
| title: String       |               | title String |


The product and reviews schemas are published to [graphql hive](https://the-guild.dev/graphql/hive) which is a schema
 registry. __Hive__ composes the sub graph schemas into a __unified schema__ that is distributed on a CDN, which is
 where/how the unified schema is referenced by the super graph.

The super graph performs the task of delegating different parts of client operations to the respective sub graph,
performing a similar function as a router or gateway.

### Other details

A super graph schema supporting apollo federation includes meta-data that describes how (and where) the super graph can 
 resolve data from different sub graphs. This data is part of the federation spec and is stripped from the schema that 
 used by consuming clients.

The super graph implementation in this demo is nothing more than a graphql mesh server configured to point at the super
 graph schema. However the services configuration from the schema can be overwritten (such as to point at a local sub
graph) to facilitate simpler local development. See [./packages/supergraph/.meshrc.yaml] for an example. 

## Installation

This demo is simple and can be run locally using node.js.

Step 1:
Copy .env.example to .env.development
```shell
cp -i .env.example .env.development
```
Then be sure to set `HIVE_CDN_TOKEN` and `HIVE_SUPERGRAPH_URL` credentials.

Step 2:
Install dependencies from npm
```shell
npm install
```

Step 3:
Run the supergraph and subgraph services together:
```shell
npm run dev
```

Step 4:
Invoke the supergraph via a browser at http://localhost:3000/graphql

