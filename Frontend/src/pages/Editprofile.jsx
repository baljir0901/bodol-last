import React, { useState, useEffect, useRef } from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
  useToast,
  Button,
  useColorMode
} from "@chakra-ui/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const Editprofile = () => {
  const pfpRef=useRef();
  const {colorMode}=useColorMode();
  const { userid } = useParams();
  const [user, setUser] = useState();
  const [pfp, setPfp]=useState();
  const [newPfpUrl, setNewPfpUrl]=useState();
  const [isLoading, setIsLoading]=useState(false);
const handleOpenFile=()=>{
  pfpRef.current.click();
}

const handleChange=(e)=>{
setPfp(e.target.files[0]);
setNewPfpUrl(URL.createObjectURL(e.target.files[0]))
}

const handleRemovePfp=()=>{
  setPfp(null)
}

  const Schema = yup.object().shape({
    name: yup.string().required("Нэр шаардлагатай"),
    username: yup.string().required("Хэрэглэгчийн нэр шаардлагатай"),
    email: yup.string().email("Имэйл хаяг буруу байна").required("Имэйл хаяг шаардлагатай"),
    password: yup.string().min(6).required("Хамгийн багадаа 6 тэмдэгт"),
    bio: yup.string(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
  });
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    try {
      const fetchUser = async () => {
        const response = await axios({
          url: `/api/v1/user/${userid}`,
          method: "get",
        });
        setUser(response?.data);
      };
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onSubmit = async (data) => {
    try {
setIsLoading(true)

      const formData= new FormData();
      if (pfp){
        formData.append('pfp', pfp); 
      }     
      formData.append('name', data.name);
      formData.append('username', data.username);
      formData.append('email', data.email);
      formData.append('bio', data.bio);
      formData.append('password', data.password);
      const response = await axios.put(`/api/v1/user/${userid}`, formData, {
        headers: {
         'Content-Type': 'multipart/form-data'
        },        
      });
      toast({
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate(`/user/${userid}`);
    } catch (error) {
      toast({
        description: "Error in updating profile",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log(error);
    }
    finally{
      setIsLoading(false)
    }
  };

  return (
    <>
      <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
        <Flex align={"center"} justify={"center"} my={6} mt={16}>
          <Stack
            spacing={4}
            w={"full"}
            maxW={"md"}
            bg={useColorModeValue("white", "gray.dark")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
          >
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
              Edit profile
            </Heading>
            <FormControl>
              <Stack direction={["column", "row"]} spacing={6}>
                <Center>
                  <Avatar size="xl" boxShadow={"md"} src={ newPfpUrl? newPfpUrl : ( user?.pfp ? user?.pfp : "/nopfp.jpeg")}/>
                </Center>
                <Center w="full">
                  <div className="w-full flex items-center justify-evenly">
               <button
                className={` ${colorMode == 'dark' ? 'bg-white text-black hover:bg-neutral-300' : 'bg-neutral-900 text-white hover:bg-zinc-800'} w-[45%]  py-2 my-2 rounded-lg font-semibold`}
           onClick={handleOpenFile}  >
                Зураг солих
              </button>
              <button
                className="w-[45%]  bg-neutral-700 text-white hover:bg-zinc-600 py-2 my-2 rounded-lg font-semibold"
              onClick={handleRemovePfp}>
                Зураг устгах
              </button>
              </div>
                  <FormControl className="hidden">
                    <FormLabel>Profile Pic</FormLabel>
                    <input type="file"  name="pfp" {...register("pfp")} ref={pfpRef} onChange={handleChange} />
                  </FormControl>
                </Center>
              </Stack>
              </FormControl>
            <FormControl>
              <FormLabel>Нэр</FormLabel>
              <Input
                placeholder="Батбаяр"
                _placeholder={{ color: "gray.500" }}
                type="text"
                {...register("name")}
                defaultValue={user?.name}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Хэрэглэгчийн нэр</FormLabel>
              <Input
                placeholder="batbayar"
                _placeholder={{ color: "gray.500" }}
                type="text"
                {...register("username")}
                defaultValue={user?.username}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Имэйл хаяг</FormLabel>
              <Input
                placeholder="таны-имэйл@example.com"
                _placeholder={{ color: "gray.500" }}
                type="email"
                {...register("email")}
                defaultValue={user?.email}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Танилцуулга</FormLabel>
              <Input
                placeholder="Танилцуулга бичнэ үү."
                _placeholder={{ color: "gray.500" }}
                type="text"
                {...register("bio")}
                defaultValue={user?.bio}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Нууц үг</FormLabel>
              <Input
                placeholder="хуучин эсвэл шинэ нууц үг"
                _placeholder={{ color: "gray.500" }}
                type="password"
                {...register("password")}
              />
            </FormControl>
            <Stack spacing={6} direction={["column", "row"]}>
              <button
                className="w-full bg-neutral-700 text-white hover:bg-zinc-600 py-2 my-2 rounded-lg font-semibold"
                onClick={() => {
                  navigate(`/user/${userid}`);
                }}
              >
                Цуцлах
              </button>
{
  isLoading ? <Button
  isLoading
  loadingText="Хадгалж байна..."
  spinnerPlacement="start"
  className="w-full bg-white text-black hover:bg-slate-200 py-2 my-2 rounded-lg font-semibold"
>
Хадгалах
</Button> :<button
                className={`w-full py-2 my-2 rounded-lg font-semibold  ${colorMode == 'dark' ? 'bg-white text-black hover:bg-neutral-300' : 'bg-neutral-900 text-white hover:bg-zinc-800'}`}
                type="submit"
              >
                Хадгалах
              </button>
}

              
            </Stack>
          </Stack>
        </Flex>
      </form>
    </>
  );
};

export default Editprofile;
