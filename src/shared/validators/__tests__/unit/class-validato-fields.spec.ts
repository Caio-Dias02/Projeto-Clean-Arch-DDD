import { ClassValidatorFields } from "../../class-validator-fields"
import * as libClassValidator from "class-validator"


class StubClassValidatorFields extends ClassValidatorFields<{ field: string }> {

}

describe('ClassValidatorFields Unit Tests', () => {
  it('should initialize errors and validatedData with null', () => {
    const sut = new StubClassValidatorFields()

    expect(sut.errors).toBeNull()
    expect(sut.validatedData).toBeNull()
  })

  it('should validate with errors', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync').mockReturnValue([{ property: 'field', constraints: { isRequired: 'field is required' } }])
    spyValidateSync.mockReturnValueOnce([{ property: 'field', constraints: { isRequired: 'field is required' } }])

    const sut = new StubClassValidatorFields()

    expect(sut.validate(null)).toBeFalsy()

    expect(spyValidateSync).toHaveBeenCalledTimes(1)

    expect(sut.validatedData).toBeNull()

    expect(sut.errors).toStrictEqual({ field: ['field is required'] })
  })


})