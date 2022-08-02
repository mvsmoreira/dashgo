import { Button, Flex, Stack } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from '../components/Form/Input'

type FormData = {
  email: string,
  password: string,
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('O e-mail é obrigatório').email('O e-mail é inválido'),
  password: yup.string().required('A senha é obrigatória'),
})

const SignIn = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: yupResolver(signInFormSchema)
  })

  const router = useRouter()

  const handleSignIn: SubmitHandler<FormData> = (data) => {
    // console.log(data)
    router.push('/dashboard')
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      <Flex
        as="form"
        w="100%"
        maxW={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">

          <Input {...register('email')} label='E-mail' type='email' error={errors.email} />

          <Input {...register('password')} label='Senha' type='password' error={errors.password} />

        </Stack>

        <Button
          type='submit'
          mt="6"
          colorScheme="pink"
          isLoading={isSubmitting}
        >
          Entrar
        </Button>

      </Flex>
    </Flex>
  )
}

export default SignIn
