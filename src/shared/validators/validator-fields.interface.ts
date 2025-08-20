export type FieldErrors = {
  field: string[]
}

export interface ValidatorFieldsInterface<PropsValidated> {
  errors: FieldErrors[]
  validatedData: PropsValidated
  validate(data: any): boolean
}