import { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  useColorModeValue,
  useToast
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signupform = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading]=useState(false);
  const Schema = yup.object().shape({
    name: yup.string().required("Нэр шаардлагатай"),
    username: yup.string().required("Хэрэглэгчийн нэр шаардлагатай"),
    email: yup.string().email("Имэйл хаяг буруу байна").required("Имэйл хаяг шаардлагатай"),
    password: yup.string().min(6).required("Хамгийн багадаа 6 тэмдэгт"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
  });
  const navigate = useNavigate();
  const toast=useToast()
  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      let response = await axios({
        url: "/api/v1/signup",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      });
      localStorage.setItem('currUser', JSON.stringify(response.data))
      toast({
        description:'Бүртгэл амжилттай үүслээ',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      navigate("/");
    } catch (error) {
      toast({
        description:error.response.data.error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <>
      <HStack>
        <Box>
          <FormControl isRequired>
            <FormLabel>Нэр</FormLabel>
            <Input type="text" {...register("name")} />
            <p>{errors.name?.message}</p>
          </FormControl>
        </Box>
        <Box>
          <FormControl isRequired>
            <FormLabel>Хэрэглэгчийн нэр</FormLabel>
            <Input type="text" {...register("username")} />
            <p>{errors.username?.message}</p>
          </FormControl>
        </Box>
      </HStack>
      <FormControl id="email" isRequired>
        <FormLabel>Имэйл хаяг</FormLabel>
        <Input type="email" {...register("email")} />
        <p>{errors.email?.message}</p>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Нууц үг</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            {...register("password")}
          />
          <InputRightElement h={"full"}>
            <Button
              variant={"ghost"}
              onClick={() => setShowPassword((showPassword) => !showPassword)}
            >
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
        <p>{errors.password?.message}</p>
      </FormControl>
      <Stack spacing={10} pt={2}>

{
  isLoading ?    <Button
      isLoading
      loadingText="Бүртгүүлж байна..."
      spinnerPlacement="start"
      size="lg"
    >
     Бүртгүүлэх
    </Button> :    <Button
          type="submit"
          loadingText="Submitting"
          size="lg"
          bg={useColorModeValue("#101010", "white")}
          color={useColorModeValue("white", "black")}
          _hover={{
            bg: useColorModeValue("#3b3b3b", "	#e0dede"),
          }}
          onClick={handleSubmit(onSubmit)}
        >
          Бүртгүүлэх
        </Button>
}
   

     
      </Stack>
    </>
  );
};

export default Signupform;
