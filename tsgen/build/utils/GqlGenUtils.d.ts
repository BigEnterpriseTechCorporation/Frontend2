import { DocumentNode, InputObjectTypeDefinitionNode, ObjectTypeDefinitionNode } from "graphql";
export declare const getFragment: (node: ObjectTypeDefinitionNode, businessObjectTypeNodeList: readonly ObjectTypeDefinitionNode[], embeddedObjectTypeNodeList: readonly ObjectTypeDefinitionNode[], simpleMode: boolean) => DocumentNode;
export declare const getSearchQuery: (node: ObjectTypeDefinitionNode) => DocumentNode;
export declare const getGetMutation: (node: ObjectTypeDefinitionNode, isDictionary: boolean, namePrefix: string | undefined) => DocumentNode;
export declare const getCreateMutation: (node: ObjectTypeDefinitionNode) => DocumentNode;
export declare const getUpdateMutation: (node: ObjectTypeDefinitionNode) => DocumentNode;
export declare const getDeleteMutation: (node: ObjectTypeDefinitionNode) => DocumentNode;
export declare const getUpdateOrCreateMutation: (inputNode: InputObjectTypeDefinitionNode, isDictionary: boolean) => DocumentNode | undefined;
export declare const getCreateManyMutation: (node: ObjectTypeDefinitionNode) => DocumentNode | undefined;
export declare const getDeleteManyMutation: (node: ObjectTypeDefinitionNode, inputNode: InputObjectTypeDefinitionNode | undefined) => DocumentNode | undefined;
