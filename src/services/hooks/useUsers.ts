import { QueryOptions, useQuery, UseQueryResult } from "@tanstack/react-query"
import { api } from "../api"

export type User = {
  id: string,
  name: string,
  email: string,
  created_at: string
}

export type GetUserResponse = {
  totalCount: number,
  users: User[]
}

export const getUsers = async (page: number): Promise<GetUserResponse> => {
    const { data, headers } = await api.get('users', {
      params: {
        page,
      }
    })

    const totalCount = Number(headers['x-total-count'])

    const users = data.users.map((user: User) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: new Date(user.created_at).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })
      }
    })

    return {
      users,
      totalCount
    }
  }

export const useUsers = (page: number, options?: QueryOptions) => {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, // 10 minutes
    ...options,
  }) as UseQueryResult<GetUserResponse, unknown>
}
