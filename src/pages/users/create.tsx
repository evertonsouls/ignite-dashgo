import { Box, SimpleGrid, Divider, Flex, Heading, VStack, HStack, Button } from "@chakra-ui/react";
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from "next/link";
import * as yup from 'yup';
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const CreateUserFormSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('password')
  ]),
})

export default function CreateUser() {
  const createUser = useMutation(async (user: CreateUserFormData) => {
    const response = await api.post('users', {
      user:{
        ...user,
        createdAt: new Date(),
      }
    })

    return response.data.user
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    }
  })

  const { 
    register, 
    handleSubmit, 
    formState: { isSubmitting, errors } 
  } = useForm({
    resolver: yupResolver(CreateUserFormSchema)
  });

  const router = useRouter();

  const handleCreateUser: SubmitHandler<CreateUserFormData> =  async (data) => {
    await createUser.mutateAsync(data)

    router.push('/users')
  }

  return (
    <Box>
      <Header />

      <Flex
        w="100%"
        my="6"
        maxWidth={1480}
        mx="auto"
        px="6"
      >
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">Create user</Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing={["6", "8"]}>
            <SimpleGrid
              minChildWidth={240}
              spacing={["6", "8"]}
              w="100%"
            >
              <Input
                name="name"
                label="Name"
                error={errors.name}
                {...register('name')}
              />
              <Input
                name="email"
                label="Email"
                type="email"
                error={errors.email}
                {...register('email')}
              />
            </SimpleGrid>

            <SimpleGrid
              minChildWidth={240}
              spacing={["6", "8"]}
              w="100%"
            >
              <Input 
                name="password" 
                label="Password" 
                type="password" 
                error={errors.password} 
                {...register('password')}
              />
              <Input
                name="password_confirmation"
                label="Confirm password"
                type="password"
                error={errors.password_confirmation} 
                {...register('password_confirmation')}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt={["6", "8"]} justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">Cancel</Button>
              </Link>
              <Button
                type="submit"
                isLoading={isSubmitting}
                colorScheme="pink"
              >
                Save
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}