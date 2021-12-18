import { Text, Heading, Container } from "@chakra-ui/react";
import StyledDiv from "./StyledDiv";

const Hero = () => {
  return (
    <div>
      <StyledDiv
        borderRadius="lg"
        p={3}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <Heading as="h2" variant="" size="3xl" mb={2}>
          Macklin Reeve-Wilson
        </Heading>
        <Heading as="h2" color="gray.400" size="2xl">
          Software Engineer
        </Heading>
        <Text wordBreak="break-word" mt={4} color="gray.400" fontSize="lg">
          I'm a design-centric Software Engineer. Whether it's frontend or
          backend, I will do anything and everything to create memorable user
          experiences.
        </Text>
      </StyledDiv>
    </div>
  );
};

export default Hero;
