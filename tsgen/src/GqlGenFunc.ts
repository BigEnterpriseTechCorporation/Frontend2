import { DocumentNode } from 'graphql'
import { extractBusinessObjectTypeNodeList, extractEmbeddedObjectTypeNodeList, extractInputObjectTypeForObjectType, extractInputObjectTypeNodeList, isDictionaryDefinition } from './utils/BaseUtils'
import { getCreateManyMutation, getCreateMutation, getDeleteManyMutation, getDeleteMutation, getFragment, getSearchQuery, getUpdateMutation, getUpdateOrCreateMutation } from './utils/GqlGenUtils'
import { print } from 'graphql/language/printer'
import { deleteManyInputTypePrefix } from './utils/Constants'


export const getGql = (astNode: DocumentNode): string => {

    // return JSON.stringify(astNode, null, 2)

    const inputNodeList = extractInputObjectTypeNodeList(astNode)
    // return JSON.stringify(inputNodeList, null, 2)

    const businessObjectTypeNodeList = extractBusinessObjectTypeNodeList(astNode)

    const embeddedObjectTypeNodeList = extractEmbeddedObjectTypeNodeList(astNode)


    return businessObjectTypeNodeList.filter(f => !isDictionaryDefinition(f))
        .map(node => {

            const fragment = getFragment(
                node,
                businessObjectTypeNodeList,
                embeddedObjectTypeNodeList,
                true
            )
            if (fragment) {
                const inputNode = extractInputObjectTypeForObjectType(inputNodeList, node)

                const updateOrCreateMutationNode = inputNode ? getUpdateOrCreateMutation(inputNode) : undefined
                const createManyMutationNode = getCreateManyMutation(node)

                const deleteManyInputNode = extractInputObjectTypeForObjectType(inputNodeList, node, deleteManyInputTypePrefix)
                const deleteManyMutationNode = getDeleteManyMutation(node, deleteManyInputNode)

                return (
                    print(fragment)
                    + "\n" + print(getSearchQuery(node))
                    + "\n" + print(getCreateMutation(node))
                    + "\n" + print(getUpdateMutation(node))
                    + "\n" + print(getDeleteMutation(node))
                    + "\n" + ((updateOrCreateMutationNode) ? print(updateOrCreateMutationNode!) : "")
                    + "\n" + ((createManyMutationNode) ? print(createManyMutationNode!) : "")
                    + "\n" + ((deleteManyMutationNode) ? print(deleteManyMutationNode!) : "")
                )
            }
        }
        ).join("\n")

}


