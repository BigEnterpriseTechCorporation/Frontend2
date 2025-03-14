export enum MutationKind {
    SIMPLE = 'SIMPLE',
    ON_INSTANCE = 'ON_INSTANCE'
}

export interface TypedField {
    fieldAlias: string
    fieldName: string
    fieldPath: string
    fieldType: string | TypedField[]
}

export interface TypedInput {
    inputName: string
    inputPath: string
    inputType: string | TypedInput[]
}

export interface GeneratedGqlForAggregate {
    aggregateName: string
    aggregateEntityList: {
        entitiyName: string
        gqlStr: string
    }[]
}

export interface FcStr {
    fcName: string
    fcStr: any
}

export interface QueryData {
    name: string
    
}

export interface Query {
    queryAlias: string
    queryName: string
    queryType: string
//    fcStr: any
    fieldList: TypedField[]
}

export interface Mutation {
    mutationAlias: string
    mutationName: string
    mutationType: MutationKind
//    fcStr: any
    inputList: TypedInput[]
    getQueryFieldList: TypedField[]
}

export interface GeneratedFcForAgg {
    aggName: string;
    // aggMenuFC: string;
    entityNameList: {
        entityName: string;
        entityQueryList?: Query[];
        entityMutationList?: Mutation[];
    }[];
}
export interface AggList {
    // mainMenuFC: string;
    aggList: GeneratedFcForAgg[];
}