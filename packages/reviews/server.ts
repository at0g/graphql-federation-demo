import { createServer } from 'node:http';
import { createYoga } from 'graphql-yoga';
import { loadFiles } from "@graphql-tools/load-files";
import { buildSubgraphSchema } from "@apollo/subgraph";
import {Resolvers} from "./codegen/types";

const resolvers: Resolvers = {
    Product: {
        __resolveReference(product) {
            return {
                id: product.id
            }
        },
        reviews(product) {
            return [
                { id: 'static 1', content: `product ${product.id} is 💖` },
            ]
        }
    }
}

async function main() {
    const typeDefs = await loadFiles('./reviews.graphql')
    const schema = buildSubgraphSchema({ typeDefs, resolvers })
    const yoga = createYoga({ schema })
    const server = createServer(yoga)
    const port = process.env.PORT;

    server.listen(port, () => {
        console.info(`Reviews service is running on http://localhost:${port}/graphql`)
    })
}

main();
