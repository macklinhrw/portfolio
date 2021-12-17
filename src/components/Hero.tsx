import { Box, Text, Heading } from "@chakra-ui/react"
const Hero = () => {
  return (
    <div>
      <Box borderRadius="lg" p={3} delay={0.1}>
        <Heading as="h2" variant="" my={3}>
          Macklin Reeve-Wilson
        </Heading>
        <Heading as="h2" color="gray.400">
          Software Engineer
        </Heading>
      </Box>
    </div>
  )
}

export default Hero;
