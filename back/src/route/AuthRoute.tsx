import React from 'react'
// import { useAuth } from '../context/AuthContext' //
import { Navigate } from 'react-router-dom'

interface AuthRouteProps {
  children: React.ReactNode
}

const AuthRoute: React.FC<AuthRouteProps> = ({
  children,
}) => {
  // const { token } = useAuth() // Получаем токен из контекста

  // if (token) {
  //   return <Navigate to="/balance" replace />
  // }

  // Если токен есть, отображаем дочерние компоненты
  return <>{children}</>
}

export default AuthRoute
