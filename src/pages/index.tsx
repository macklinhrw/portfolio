import { Container, Box } from "@chakra-ui/react"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar";

const Page = () => {
  return (
    <Box>
      <Navbar />
      <Container mt={36} maxW="container.md">
        <Hero />
      </Container>
    </Box>
  )
}

export default Page;
