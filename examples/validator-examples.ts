import { IsString, IsEmail, MinLength, IsNotEmpty } from "class-validator"
import { ClassValidatorFields } from "../src/shared/validators/class-validator-fields"

// Exemplo 1: Validador para User
class UserValidator extends ClassValidatorFields<{ name: string; email: string; password: string }> {
  // Esta classe herda toda a lógica de validação da classe pai
}

// Exemplo 2: DTO com decorators de validação
class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(6)
  password: string
}

// Exemplo 3: Uso prático
function exemploUso() {
  const validator = new UserValidator()
  
  // Caso 1: Dados válidos
  const dadosValidos = new CreateUserDto()
  dadosValidos.name = "João Silva"
  dadosValidos.email = "joao@email.com"
  dadosValidos.password = "123456"
  
  const resultadoValido = validator.validate(dadosValidos)
  console.log("Resultado válido:", resultadoValido) // true
  console.log("Dados validados:", validator.validatedData) // { name: "João Silva", email: "joao@email.com", password: "123456" }
  console.log("Erros:", validator.errors) // null
  
  // Caso 2: Dados inválidos
  const dadosInvalidos = new CreateUserDto()
  dadosInvalidos.name = "" // Inválido: IsNotEmpty falha
  dadosInvalidos.email = "email-invalido" // Inválido: IsEmail falha
  dadosInvalidos.password = "123" // Inválido: MinLength falha
  
  const resultadoInvalido = validator.validate(dadosInvalidos)
  console.log("Resultado inválido:", resultadoInvalido) // false
  console.log("Dados validados:", validator.validatedData) // null
  console.log("Erros:", validator.errors) 
  // {
  //   name: ["name should not be empty"],
  //   email: ["email must be an email"],
  //   password: ["password must be longer than or equal to 6 characters"]
  // }
}

// Exemplo 4: Validador específico para Product
class ProductValidator extends ClassValidatorFields<{ name: string; price: number; category: string }> {
  // Herda toda a lógica de validação
}

class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  price: number

  @IsString()
  category: string
}

export { UserValidator, CreateUserDto, ProductValidator, CreateProductDto, exemploUso }
