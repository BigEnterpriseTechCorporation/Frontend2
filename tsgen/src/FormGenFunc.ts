import { DefinitionNode, DocumentNode, FieldNode, FragmentDefinitionNode, InputObjectTypeDefinitionNode, ObjectTypeDefinitionNode, OperationDefinitionNode, SelectionNode, TypeNode, VariableDefinitionNode } from 'graphql'
import { GeneratedFcForAgg, AggList, TypedField, Query, Mutation, TypedInput, MutationKind } from './utils/types/Basic'
import { extractBusinessObjectTypeNodeList, extractEmbeddedObjectTypeNodeList, extractInputObjectTypeNodeList, toUpperCaseFirstLetter } from './utils/BaseUtils'
import { searchPrefix, entityPrefix, primitiveTypeList, referencePrefix, referencePostfix, createPrefix } from './utils/Constants'
// import { getMainMenuFC, getAggMenuFC } from './formgen-templates/antd/FCTmpl'

const { SIMPLE, ON_INSTANCE } = MutationKind



interface QueryOperationDefinitionNode extends OperationDefinitionNode { operation: "query" }
const isQueryOperationDefinition = (dn: DefinitionNode): dn is QueryOperationDefinitionNode => {
    return dn.kind === "OperationDefinition" && dn.operation === "query"
}
const extractQueryOperationDefinitionList = (dnList: readonly DefinitionNode[]): QueryOperationDefinitionNode[] => {
    return dnList.filter(isQueryOperationDefinition)
}

interface MutationOperationDefinitionNode extends OperationDefinitionNode { operation: "mutation" }
const isMutationOperationDefinition = (dn: DefinitionNode): dn is MutationOperationDefinitionNode => {
    return dn.kind === "OperationDefinition" && dn.operation === "mutation"
}
const extractMutationOperationDefinitionList = (dnList: readonly DefinitionNode[]): MutationOperationDefinitionNode[] => {
    return dnList.filter(isMutationOperationDefinition)
}

const isFragmentDefinition = (dn: DefinitionNode): dn is FragmentDefinitionNode => {
    return dn.kind === "FragmentDefinition"
}
const extractFragmentDefinitionList = (dnList: readonly DefinitionNode[]): FragmentDefinitionNode[] => {
    return dnList.filter(isFragmentDefinition)
}

const isDsElemsField = (sn: SelectionNode): sn is FieldNode => {
    return sn.kind === "Field" && sn.name.value === "elems"
}
const extractFirstSelectionList = (fieldNode: FieldNode): readonly SelectionNode[] | undefined => {
    const elemsNodes = fieldNode.selectionSet?.selections.filter(isDsElemsField)
    if (elemsNodes && elemsNodes.length > 0)
        return elemsNodes[0].selectionSet?.selections
}


// FIELD

const extractTypeName = (typeNode: TypeNode): string | undefined => {

    if (typeNode.kind == "NamedType") {
        return typeNode.name.value
    }

    if (typeNode.kind == "NonNullType") {
        return extractTypeName(typeNode.type)
    }
}

const extractFieldTypeName = (
    queryType: string,
    fieldNode: FieldNode,
    businessObjectTypeNodeList: readonly ObjectTypeDefinitionNode[],
    embeddedObjectTypeNodeList: readonly ObjectTypeDefinitionNode[],
): string | undefined => {

    if (queryType.startsWith(referencePrefix) && queryType.endsWith(referencePostfix))
        return queryType

    const typedNode =
        businessObjectTypeNodeList.find(n => n.name.value === queryType)?.fields?.find(f => f.name.value === fieldNode.name.value)?.type
        ?? embeddedObjectTypeNodeList.find(n => n.name.value === queryType)?.fields?.find(f => f.name.value === fieldNode.name.value)?.type

    if (typedNode)
        return extractTypeName(typedNode)
}

const extractTypedField = (
    queryType: string,
    fieldNode: FieldNode,
    fragmentDefinitionList: FragmentDefinitionNode[],
    businessObjectTypeNodeList: readonly ObjectTypeDefinitionNode[],
    embeddedObjectTypeNodeList: readonly ObjectTypeDefinitionNode[],
    typedFieldList: TypedField[]
) => {
    if (!typedFieldList.find(tf => tf.fieldName === fieldNode.name.value)) {
        const fieldTypeName = extractFieldTypeName(queryType, fieldNode, businessObjectTypeNodeList, embeddedObjectTypeNodeList)

        if (fieldTypeName) {
            typedFieldList.push({
                fieldAlias: fieldNode.alias?.value ?? fieldNode.name.value,
                fieldName: fieldNode.name.value,
                fieldPath: fieldNode.name.value,
                fieldType: (fieldTypeName.startsWith(referencePrefix) && fieldNode.selectionSet) ?
                    extractTypedFieldList(fieldTypeName, fieldNode.selectionSet!.selections, fragmentDefinitionList, businessObjectTypeNodeList, embeddedObjectTypeNodeList) :
                    fieldTypeName
            })
        }
    }
}


const extractTypedFieldList = (queryType: string,
    selectionNodeList: readonly SelectionNode[],
    fragmentDefinitionList: FragmentDefinitionNode[],
    businessObjectTypeNodeList: readonly ObjectTypeDefinitionNode[],
    embeddedObjectTypeNodeList: readonly ObjectTypeDefinitionNode[]
): TypedField[] => {

    const typedFieldList: TypedField[] = []

    selectionNodeList.forEach(sn => {
        if (sn.kind === "FragmentSpread") {
            const fragmentDefenition = fragmentDefinitionList.find(fd => fd.name.value === sn.name.value)
            fragmentDefenition?.selectionSet.selections.forEach(fd => {
                if (fd.kind === "Field")
                    extractTypedField(queryType, fd, fragmentDefinitionList, businessObjectTypeNodeList, embeddedObjectTypeNodeList, typedFieldList)
            })
        } else if (sn.kind === "Field") {
            extractTypedField(queryType, sn, fragmentDefinitionList, businessObjectTypeNodeList, embeddedObjectTypeNodeList, typedFieldList)
        }
    })

    return typedFieldList
}

const getQueryList = (documentNode: DocumentNode, businessObjectTypeNodeList: readonly ObjectTypeDefinitionNode[], embeddedObjectTypeNodeList: readonly ObjectTypeDefinitionNode[]): Query[] => {

    const result: Query[] = []
    const queryOperationDefinitionList = extractQueryOperationDefinitionList(documentNode.definitions)
    const fragmentDefinitionList = extractFragmentDefinitionList(documentNode.definitions)

    queryOperationDefinitionList.forEach(qod => {



        qod.selectionSet.selections.forEach(sn => {

            if (sn.kind === "Field") {
                const firstSelectionList = extractFirstSelectionList(sn)

                if (firstSelectionList) {

                    const entityName = sn.name.value.substring(searchPrefix.length)
                    const queryType = entityPrefix.concat(entityName)

                    const typedFieldList = extractTypedFieldList(queryType, firstSelectionList, fragmentDefinitionList, businessObjectTypeNodeList, embeddedObjectTypeNodeList)

                    result.push({
                        queryAlias: sn.alias?.value ?? sn.name.value,
                        queryName: sn.name.value,
                        queryType: queryType,
                        fieldList: typedFieldList
                    })
                }
            }
        })
    })

    return result
}





// INPUT

const extractInputObjectTypeFieldList = (
    inputObjectType: TypeNode,
    inputObjectTypeNodeList: readonly InputObjectTypeDefinitionNode[],
    path?: string
): TypedInput[] => {

    const inputObjectTypeName = extractTypeName(inputObjectType)
    const result: TypedInput[] = []

    if (inputObjectTypeName) {
        inputObjectTypeNodeList
            .find(inputObjectType => inputObjectType.name.value === inputObjectTypeName)?.fields
            ?.forEach(inputObjectTypeField => {

                const fieldTypeName = extractTypeName(inputObjectTypeField.type) ?? ""
                result.push({
                    inputName: inputObjectTypeField.name.value,
                    inputPath: "",
                    inputType: primitiveTypeList.includes(fieldTypeName) ? fieldTypeName : extractInputObjectTypeFieldList(inputObjectTypeField.type, inputObjectTypeNodeList, "",)
                })
            })
    }

    return result

}

const extractVariableTypedInput = (
    variableDefinition: VariableDefinitionNode,
    inputObjectTypeNodeList: readonly InputObjectTypeDefinitionNode[],
    inputPath?: string,
): TypedInput => {

    const variableTypeName = extractTypeName(variableDefinition.type) ?? ""

    const result: TypedInput = {
        inputName: variableDefinition.variable.name.value,
        inputPath: inputPath ?? "",
        inputType: primitiveTypeList.includes(variableTypeName) ? variableTypeName : extractInputObjectTypeFieldList(variableDefinition.type, inputObjectTypeNodeList, "")
    }

    return result
}
const getMutationList = (
    entityName: string,
    documentNode: DocumentNode,
    inputObjectTypeNodeList: readonly InputObjectTypeDefinitionNode[],
    fragmentDefinitionList: FragmentDefinitionNode[],
    businessObjectTypeNodeList: readonly ObjectTypeDefinitionNode[],
    embeddedObjectTypeNodeList: readonly ObjectTypeDefinitionNode[]

): Mutation[] => {

    const result: Mutation[] = []
    const mutationOperationDefinitionList = extractMutationOperationDefinitionList(documentNode.definitions)


    mutationOperationDefinitionList.forEach(md => {

        const mutationSelections = mutationOperationDefinitionList.find(_md => _md.name?.value == "getFor" + toUpperCaseFirstLetter(md.name?.value ?? ""))?.selectionSet.selections
        const packetSelections = (mutationSelections && mutationSelections.length > 0) && mutationSelections[0].kind === "Field" ? mutationSelections[0].selectionSet?.selections : undefined
        const querySelections = (packetSelections && packetSelections.length > 0) && packetSelections[0].kind === "Field" ? packetSelections[0].selectionSet?.selections : undefined
        //const queryFirstSelection = (querySelections && querySelections?.length > 0) ? querySelections[0] : undefined 

        const mutationName = md.name?.value ?? ""

        const mutation: Mutation = {
            mutationAlias: md.name?.value ?? "",
            mutationName: mutationName,
            mutationType: (mutationName.startsWith(createPrefix) ? SIMPLE : ON_INSTANCE),
            //            fcStr: "",//md,
            inputList: [],
            getQueryFieldList: (querySelections && querySelections?.length > 0) ? (
                extractTypedFieldList(
                    entityPrefix.concat(entityName),
                    querySelections,
                    fragmentDefinitionList,
                    businessObjectTypeNodeList,
                    embeddedObjectTypeNodeList
                )
            ) : []
        }

        md.variableDefinitions?.forEach(vd => {
            mutation.inputList.push(extractVariableTypedInput(vd, inputObjectTypeNodeList, ""))
        })

        result.push(mutation)

    })

    return result
}

export const getFormData = (
    astNode: DocumentNode,
    documents: { location: string, document: DocumentNode }[],
    config: any
): string => {

    const businessObjectTypeNodeList = extractBusinessObjectTypeNodeList(astNode)
    const embeddedObjectTypeNodeList = extractEmbeddedObjectTypeNodeList(astNode)
    const inputObjectTypeNodeList = extractInputObjectTypeNodeList(astNode)


    const aggTabList: GeneratedFcForAgg[] = []

    documents.forEach(doc => {

        const locationTail = doc.location.split("/").slice(-2)

        // todo error handling
        const aggName = locationTail[0]
        const entityName = locationTail[1].split(".").slice(-2)[0]

        const resultTab = aggTabList.find(f => f.aggName === aggName) ??
            aggTabList[aggTabList.push({ aggName: aggName, /* aggMenuFC: "", */ entityNameList: [] }) - 1]

        resultTab.entityNameList.push({
            entityName: entityName,
            entityQueryList: getQueryList(doc.document, businessObjectTypeNodeList, embeddedObjectTypeNodeList),
            entityMutationList: getMutationList(
                entityName,
                doc.document,
                inputObjectTypeNodeList,
                extractFragmentDefinitionList(doc.document.definitions),
                businessObjectTypeNodeList,
                embeddedObjectTypeNodeList
            )
        })


    })

    const result: AggList = {
        aggList: aggTabList
    }

    return JSON.stringify(result, null, 2)

}


