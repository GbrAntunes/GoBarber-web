import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback } from 'react'
import { IconBaseProps } from 'react-icons'
import { FiAlertCircle } from 'react-icons/fi'
import { useField } from '@unform/core'

import { Container, Error } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  icon: React.ComponentType<IconBaseProps>
}

// Caso uma propriedade seja um componente (como é o caso do icon), precisamos mudar o nome
// para começar com letra maiúscula (Icon), caso contrário, ao tentar mostrar em tela, o React não
// vai entender no caso de escrevermos com letra minúscula
const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const { fieldName, defaultValue, error, registerField } = useField(name)
  
  // useCallback é um hook que vai criar uma função e só vai recria-la caso
  // as variáveis no segundo parâmetro mudem. Caso o segundo parâmetro esteja vazio
  // a função nunca será recriada.
  // LEI: Sempre que for criar uma função dentro de um componente, USECALLBACK
  const handleInputBlur = useCallback(() => {
    setIsFocused(false)

    // Se current.value estiver preenchido, setIsFilled(true)
    setIsFilled(!!inputRef.current?.value)
  }, [])

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value' // Para acessar o valor do input na DOM, precisamos de um .value
    })
  }, [fieldName, registerField])

  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />

      {error && <Error title={error}>
        <FiAlertCircle color="#C53030" size={20} />
      </Error>}
    </Container>
  )
}

export default Input