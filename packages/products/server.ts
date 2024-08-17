import { createServer } from 'node:http';
import { createYoga } from 'graphql-yoga';
import { loadFiles } from "@graphql-tools/load-files";
import { buildSubgraphSchema } from "@apollo/subgraph";
import {Resolvers} from "./codegen/types";

const resolvers: Resolvers = {
    Query: {
        product(_, args) {
            return {
                id: args.id,
                title: `Product ${args.id}`,
                price: {}
            }
        }
    }
}

async function main() {
    const typeDefs = await loadFiles('./products.graphql')
    const schema = buildSubgraphSchema({
        typeDefs,
        resolvers
    })
    const yoga = createYoga({ schema })
    const server = createServer(yoga)
    const port = process.env.PORT;

    server.listen(port, () => {
        console.info(`Products service is running on http://localhost:${port}/graphql`)
    })
}

main();
