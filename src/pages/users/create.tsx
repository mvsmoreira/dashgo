import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react"
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import Link from "next/link"
import { useRouter } from "next/router"
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { Input } from "../../components/Form/Input"
import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import { api } from "../../services/api"
import { queryClient } from "../../services/queryClient"

type CreateUserFormData = {
  name: string,
  email: string,
  password: string,
  password_confirmation: string,
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório'),
  email: yup.string().required('O e-mail é obrigatório').email('O e-mail é inválido'),
  password: yup.string().required('A senha é obrigatória').min(6, 'A senha precisa ter no mínimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([
    null,
    yup.ref('password')
  ], 'As senhas não são iguais')
})

const CreateUser = () => {
  const router = useRouter()

  const createUser = useMutation(async (user: CreateUserFormData) => {
    const response = await api.post('users', {
      user: {
        ...user,
        created_at: new Date(),
      }
    })

    return response.data.user
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
    }
  })

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserFormSchema)
  })

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (data) => {
    await createUser.mutateAsync(data)

    router.push('/users')
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">Criar usuário</Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing="8">

            <SimpleGrid minChildWidth={240} spacing={["6", "8"]} w="100%">
              <Input
                {...register('name')}
                error={errors.name}
                label="Nome completo"
              />
              <Input
                {...register('email')}
                error={errors.email}
                type="email"
                label="E-mail"
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth={240} spacing={["6", "8"]} w="100%">
              <Input
                {...register('password')}
                error={errors.password}
                type="password"
                label="Senha"
              />
              <Input
                {...register('password_confirmation')}
                error={errors.password_confirmation}
                type="password"
                label="Confirmar senha"
              />
            </SimpleGrid>

          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button
                type="submit"
                colorScheme="pink"
                isLoading={isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

export default CreateUser
