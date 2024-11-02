import { DefinitionNode, DocumentNode, FieldDefinitionNode, InputObjectTypeDefinitionNode, ObjectTypeDefinitionNode } from "graphql";
import { entityPrefix, referencePrefix, systemTypesList, systemFieldList, historySystemFields, statusHistoryFieldPostfix, inputTypePostfix, createInputTypePrefix, aggregateRootFieldName, rootDictionaryTypeName, referenceFields } from './Constants'


export const isDictionaryDefinition = (dn: ObjectTypeDefinitionNode): Boolean => {
    return !!(dn.fields?.find(f =>
        f.name.value === aggregateRootFieldName && f.type.kind === "NamedType" && f.type.name.value === rootDictionaryTypeName)
    )
}

export const isAggregateRootDefinition = (dn: ObjectTypeDefinitionNode): Boolean => {
    return !dn.fields?.find(f =>
        f.name.value === aggregateRootFieldName
    )
}

const isBusinessObjectTypeDefinition = (dn: DefinitionNode): dn is ObjectTypeDefinitionNode => {
    return dn.kind === "ObjectTypeDefinition"
        && dn.name.value.startsWith(entityPrefix)
        && !(systemTypesList.includes(dn.name.value))
        && !(dn.name.value.endsWith(statusHistoryFieldPostfix))
        && !(dn.fields?.find(f => historySystemFields.includes(f.name.value)))
}
export const extractBusinessObjectTypeNodeList = (astNode: DocumentNode): readonly ObjectTypeDefinitionNode[] => {
    return astNode.definitions.filter(isBusinessObjectTypeDefinition)
}

const isInputObjectTypeDefinition = (dn: DefinitionNode): dn is InputObjectTypeDefinitionNode => {
    return dn.kind === "InputObjectTypeDefinition"
}
export const extractInputObjectTypeNodeList = (astNode: DocumentNode): readonly InputObjectTypeDefinitionNode[] => {
    return astNode.definitions.filter(isInputObjectTypeDefinition)
}
export const extractInputObjectTypeForObjectType = (
    inputObjectTypeNodeList: readonly InputObjectTypeDefinitionNode[],
    objectTypeNode: ObjectTypeDefinitionNode,
    inputPrefix?: string
): InputObjectTypeDefinitionNode | undefined => {

    const prefixedNodeName = objectTypeNode.name.value
    const nodeName = prefixedNodeName.substring(entityPrefix.length)

    return inputObjectTypeNodeList.find(n => n.name.value === `${inputPrefix ?? createInputTypePrefix}${nodeName}${inputTypePostfix}`)
}

export const extractBusinessFieldNodeList = (node: ObjectTypeDefinitionNode): readonly FieldDefinitionNode[] => {
    return node.fields?.filter(f => !(systemFieldList.includes(f.name.value))) ?? []
}

const isEmbeddedObjectTypeDefinition = (dn: DefinitionNode): dn is ObjectTypeDefinitionNode => {
    return dn.kind === "ObjectTypeDefinition"
        && dn.name.value.startsWith(referencePrefix)
        && dn.fields ?
        dn.fields.map(f => f.name.value).filter(fn => !referenceFields.includes(fn)).length > 0
        : false
}
export const extractEmbeddedObjectTypeNodeList = (astNode: DocumentNode): readonly ObjectTypeDefinitionNode[] => {
    return astNode.definitions.filter(isEmbeddedObjectTypeDefinition)
}






