import { IsString, IsNotEmpty, IsEmail, validateSync } from "class-validator"

// DTO com decorators
class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  email: string
}

function demonstrarDecorators() {
  console.log("=== ATRIBUINDO VALORES (SEM VALIDAÇÃO) ===")

  const user = new CreateUserDto()

  // Estes valores são inválidos, mas NÃO geram erro
  user.name = ""           // String vazia - deveria falhar @IsNotEmpty()
  user.email = "invalido"  // Não é email - deveria falhar @IsEmail()

  console.log("Nome:", user.name)     // "" - aceita sem problema
  console.log("Email:", user.email)   // "invalido" - aceita sem problema
  console.log("✅ Nenhum erro foi gerado!")

  console.log("\n=== VALIDANDO EXPLICITAMENTE ===")

  // AGORA sim a validação acontece
  const errors = validateSync(user)
  console.log("Erros encontrados:", errors)
  // [
  //   ValidationError {
  //     property: 'name',
  //     constraints: { isNotEmpty: 'name should not be empty' }
  //   },
  //   ValidationError {
  //     property: 'email',
  //     constraints: { isEmail: 'email must be an email' }
  //   }
  // ]

  console.log("\n=== VALORES VÁLIDOS ===")

  const userValido = new CreateUserDto()
  userValido.name = "João Silva"
  userValido.email = "joao@email.com"

  const errorsValido = validateSync(userValido)
  console.log("Erros encontrados:", errorsValido) // [] - array vazio, sem erros
}

export { demonstrarDecorators }
