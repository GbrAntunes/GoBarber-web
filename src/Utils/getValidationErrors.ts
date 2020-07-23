import { ValidationError } from 'yup'

interface Errors {
  // Permite que vários atributos sejam incluídos nesse tipo, contanto que
  // a chave seja string e o valor também
  [key: string]: string
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {}

  err.inner.forEach(error => {
    validationErrors[error.path] = error.message
  })

  return validationErrors
}