import { UserEntity, UserProps } from "../../../entities/user.entity"
import { faker } from "@faker-js/faker"

describe('UserEntity', () => {
    let props: UserProps 
    let sut: UserEntity
    
    beforeEach(() => {
        props = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
         }        
        
        sut = new UserEntity(props)
    })

    it('should be able to create a user', () => {
       
        expect(sut).toBeDefined()
        expect(sut.props.name).toBe(props.name)
        expect(sut.props.email).toBe(props.email)
        expect(sut.props.password).toBe(props.password)
    })
})