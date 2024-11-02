import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'graphql/schema.graphql',
  generates: {
    'graphql/__generate/requests.graphql': {
      plugins: ['gqlgen-plugin.js']
    },
  }
}

export default config