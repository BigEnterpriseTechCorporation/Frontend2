export interface TypedField {
    fieldName: string,
    fieldType: string,
    fieldClass: "id" | "primitive" | "innerRef" | "extRef" | "embeddedObject"
}