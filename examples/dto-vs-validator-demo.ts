import { IsString, IsNotEmpty, IsEmail } from "class-validator"
import { ClassValidatorFields } from "../src/shared/validators/class-validator-fields"

// DTO com decorators
class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  email: string
}

// Validator que usa o DTO
class UserValidator extends ClassValidatorFields<{ name: string; email: string }> {}

// Demonstração
function demonstrarValidacao() {
  console.log("=== DTO SOZINHO (SEM VALIDAÇÃO) ===")

  const userData = new CreateUserDto()
  userData.name = ""           // Valor inválido
  userData.email = "invalido"  // Valor inválido

  console.log("Nome:", userData.name)     // "" - aceita qualquer valor
  console.log("Email:", userData.email)   // "invalido" - aceita qualquer valor
  console.log("DTO não valida automaticamente!")

  console.log("\n=== DTO + VALIDATOR (COM VALIDAÇÃO) ===")

  const validator = new UserValidator()
  const resultado = validator.validate(userData)

  console.log("Resultado da validação:", resultado) // false
  console.log("Erros encontrados:", validator.errors)
  // {
  //   name: ["name should not be empty"],
  //   email: ["email must be an email"]
  // }

  console.log("\n=== DADOS VÁLIDOS ===")

  const dadosValidos = new CreateUserDto()
  dadosValidos.name = "João Silva"
  dadosValidos.email = "joao@email.com"

  const resultadoValido = validator.validate(dadosValidos)
  console.log("Resultado da validação:", resultadoValido) // true
  console.log("Dados validados:", validator.validatedData)
  console.log("Erros:", validator.errors) // null
}

export { demonstrarValidacao }
