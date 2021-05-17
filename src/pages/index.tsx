import { Button, Flex, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { Input } from '../components/Form/Input'

type SignInFormData = {
  email: string;
  password: string;
}

const SignInFormSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
})

export default function SignIn() {
  const { 
    register, 
    handleSubmit, 
    formState: { isSubmitting, errors } 
  } = useForm({
    resolver: yupResolver(SignInFormSchema)
  });

  const router = useRouter();

  const handleSignIn: SubmitHandler<SignInFormData> =  async (data) => {
    await new Promise(resolve => setTimeout(resolve,2000));
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
          <Input 
            label="Email" 
            name="email" 
            type="email"
            error={errors.email}
            {...register('email')}
          />

          <Input 
            label="Password" 
            name="password" 
            type="password" 
            error={errors.password}
            {...register('password')}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          size="lg"
          colorScheme="pink"
          isLoading={isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>    
  )
}
