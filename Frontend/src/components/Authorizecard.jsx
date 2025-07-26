import {Flex,Box,Stack,Heading,Text, useColorModeValue,Link,} from '@chakra-ui/react'
import { useState } from 'react'
import Signupform from './Signupform'
import Loginform from './Loginform'

export default function AuthorizeCard() {
const [isLogin, setIslogin]=useState(false)
  return (
    <Flex
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('white', '#101010')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={10} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
          {isLogin ? 'Нэвтрэх': 'Бүртгүүлэх'}
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', '#101010')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
         {isLogin ? <Loginform/> : <Signupform/>} 
            <Stack pt={6}>
              <Text align={'center'} color={"gray"}>
              {isLogin ? 'Бүртгэл байхгүй юу?': 'Аль хэдийн бүртгэлтэй юу?'}  <Link color={useColorModeValue('#101010', 'white')} onClick={()=>{setIslogin(!isLogin)}}>{isLogin ? 'Бүртгүүлэх': 'Нэвтрэх'}</Link>

              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}