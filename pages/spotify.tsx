import React from 'react'
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  useBreakpointValue,
  Button,
  Icon,
  Flex,
} from '@chakra-ui/react'
import { Fade } from 'react-awesome-reveal'
import { RecentSongs, TopArtists, TopSongs, CurrentlyPlaying } from '@/components/MusicLayouts'
import { NextSeo } from 'next-seo'
import { useQuery } from 'react-query'

interface ListFadeProps {
  children: any
}
const ListFade = ({ children }: ListFadeProps): React.ReactElement => {
  const bp = useBreakpointValue({ base: false, md: true })
  if (!bp) {
    return children
  }
  return (
    <Fade cascade delay={1000} triggerOnce>
      {children}
    </Fade>
  )
}

interface HeadingFadeProps {
  children: any
}
const HeadingFade = ({ children }: HeadingFadeProps): React.ReactElement => {
  const bp = useBreakpointValue({ base: false, md: true })
  if (!bp) {
    return children
  }
  return (
    <Fade direction='up' triggerOnce cascade>
      {children}
    </Fade>
  )
}

interface SpotifyProps {
  data: any
  error: string | null
  revalidate?: number
}

function Spotify({ data, error }: SpotifyProps): React.ReactElement {
  const { error: currentError, data: currentlyPlaying } = useQuery(
    `currentlyPlaying`,
    () => fetch(`/api/get-now-playing`).then(res => res.json()),
    { refetchOnMount: true }
  )
  if (error || currentError) {
    return <div>There was an error fetching data from spotify</div>
  }

  return (
    <>
      <NextSeo title='Music' />
      {` `}
      <Box
        width='full'
        maxW={{ base: `full`, lg: `7xl`, xl: `8xl` }}
        px={{ base: 2, md: 5 }}
        pb={{ base: 16, md: 28 }}
        mx='auto'
      >
        <HeadingFade>
          <Heading
            pt='28'
            fontSize={{ base: `3xl`, sm: `4xl`, md: `5xl`, lg: `6xl` }}
            textAlign='center'
          >
            Here&apos;s what I&apos;m listening to at the moment
          </Heading>
          <Text textAlign='center' pt='5'>
            *Top Songs and Artists over the past 6 months
          </Text>
          <Flex justifyContent='center'>
            <Button
              as='a'
              href='https://open.spotify.com/user/devang.j1998?si=40080c45b9af4c98'
              variant='ghost'
              colorScheme='brand'
              size='lg'
              mt={5}
              leftIcon={
                <Icon viewBox='0 0 168 168'>
                  <path
                    fill='#1ED760'
                    d='M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z'
                  />
                </Icon>
              }
            >
              View My Profile
            </Button>
          </Flex>
        </HeadingFade>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          height='full'
          width='full'
          maxWidth='full'
          spacingY={10}
          spacingX={10}
          pt={16}
        >
          <ListFade>
            <TopArtists artists={data.artists.items} />
            <CurrentlyPlaying song={currentlyPlaying} />
            <TopSongs songs={data.songs.items} />
            <RecentSongs songs={data.recentlyPlayed.items} />
          </ListFade>
        </SimpleGrid>
      </Box>
    </>
  )
}

export async function getServerSideProps(): Promise<{ props: SpotifyProps }> {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_HOST || `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    }/api/get-spotify-data`
    // `http://localhost:3000/api/get-spotify-data`
  )
  let error = null
  if (response.status !== 200) {
    error = `There was an error: ${response.status}`
  }
  const data = await response.json()
  return { props: { data, error, revalidate: 60 } }
}

export default Spotify
