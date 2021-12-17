import { Container, Box } from "@chakra-ui/react"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar";

const Page = () => {
  return (
    <Box>
      <Navbar />
      <Container my={36}>
        <Hero />
      </Container>
    </Box>
  )
}

export default Page;
