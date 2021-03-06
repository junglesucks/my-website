import {
  Box,
  Flex,
  Heading,
  Image,
  chakra,
  useColorModeValue,
  Skeleton,
  Link as ChakraLink,
  // useBreakpoint,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { NextSeo } from 'next-seo';

export default function Home(): React.ReactElement {
  const [imageLoad, setImageLoad] = useState(false);
  // const bp = useBreakpoint();
  // const { colorMode } = useColorMode();
  return (
    <>
      <NextSeo title='Home' />

      <Box
        minH='100vh'
        height='full'
        width={{ base: '95%', md: '90%', lg: '80%', xl: '90%W' }}
        maxW='7xl'
        mx='auto'
        pt={{ base: '28', sm: '14', md: '16', xl: '20' }}
      >
        {/* Im not actually too sure why this needs to be here, but without this additional flex
        the body doesn't begin at the top of the page... */}
        <Flex
          direction='column'
          justifyContent={{ base: 'center', md: 'flex-start' }}
          height='full'
          width='full'
          p={{ base: 0, sm: 16 }}
        >
          <Flex
            direction={{ base: `column`, lg: `row` }}
            alignItems='center'
            mx='auto'
            my={{ xl: '16' }}
          >
            <Skeleton isLoaded={imageLoad} boxSize='250px' borderRadius='2xl' m='auto'>
              <Image
                flexGrow={3}
                borderRadius='2xl'
                boxSize='250px'
                src='./static/images/profile.gif'
                objectFit='cover'
                alt='Michael Hall'
                onLoad={() => setImageLoad(true)}
              />
            </Skeleton>
            <Flex
              alignSelf='center'
              direction='column'
              pl={{ base: 0, lg: 10 }}
              my={{ base: 10, lg: 0 }}
              flexGrow={1}
            >
              <Heading
                bgGradient={`linear(to-r, ${useColorModeValue(
                  `brand.600`,
                  `brand.400`
                )}, ${useColorModeValue(`teal.600`, `teal.400`)}, ${useColorModeValue(
                  `blue.600`,
                  `blue.300`
                )})`}
                className='moving-grad'
                bgClip='text'
                fontSize={{ base: `5xl`, lg: `7xl` }}
                textAlign={{ base: `center`, lg: `left` }}
              >
                junglesucks.com!
              </Heading>
              <chakra.p
                maxW='650px'
                textAlign={{ base: `center`, lg: `left` }}
                fontSize='xl'
                mt={2}
              >
                Welcome to my website! I use this as a connection to everything me, and test things out.
                You can see what music I like on{' '}
                <Link href='/music' passHref>
                  <ChakraLink>music page</ChakraLink>
                </Link>{' '}
                or stuff I{' '}
                <Link href='/links' passHref>
                  <ChakraLink>self-hosted </ChakraLink>
                </Link>{' '} 
                &{' '}
                <Link href='/links' passHref>
                  <ChakraLink>tools</ChakraLink>
                </Link>{' '}
                that I like. If you get lucky you might even find some of my {' '}
                <Link href='https://ghost.junglesucks.com' passHref>
                  <ChakraLink>blogs</ChakraLink>
                </Link>
                .
              </chakra.p>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
