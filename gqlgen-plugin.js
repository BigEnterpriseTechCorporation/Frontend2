const { getGql } = require('./tsgen/build/GqlGenFunc')
const { getCachedDocumentNodeFromSchema } = require('@graphql-codegen/plugin-helpers')

module.exports = {
  plugin(schema) {
    const astNode = getCachedDocumentNodeFromSchema(schema)
    return getGql(astNode)
  }
}