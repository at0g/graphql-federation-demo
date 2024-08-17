import { CodegenConfig } from "@graphql-codegen/cli";

const subgraphConfig = {
    plugins: [
        'typescript',
        'typescript-resolvers'
    ],
    config: {
        //  https://github.com/dotansimha/graphql-code-generator/issues/4137#issuecomment-636436465
        useIndexSignature: true,
        federation: true
    }
}

const config: CodegenConfig = {
    generates: {
        'packages/products/codegen/types.ts': {
            schema: 'packages/products/products.graphql',
            ...subgraphConfig
        },
        'packages/reviews/codegen/types.ts': {
            schema: 'packages/reviews/reviews.graphql',
            ...subgraphConfig
        }
    }
}

export default config
