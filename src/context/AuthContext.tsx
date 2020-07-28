import React, { createContext, useCallback } from 'react'
import api from '../services/api'

interface SignInCredentials {
  email: string
  password: string
}

interface AuthContextData {
  name: string
  signIn(credentials: SignInCredentials): Promise<void>
}

// Precisamos passar como parâmetro o valor inicial do contexto, porém, é óbvio que um
// valor de autenticação não possui dados iniciais. Para burlar essa verificação, podemos
// passar um objeto vazio do tipo AuthContext.
const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
)

const AuthProvider: React.FC = ({ children }) => {
  
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password
    })

    console.log(response.data)
  }, [])

  return (
    <AuthContext.Provider value={{ name: 'Gabriel', signIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }