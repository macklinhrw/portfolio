import {
  Text,
  Heading,
} from "@chakra-ui/react";
import StyledDiv from "./StyledDiv"


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
        <Heading as="h2" variant="">
          Macklin Reeve-Wilson
        </Heading>
        <Heading as="h2" color="gray.400">
          Software Engineer
        </Heading>
        <Text wordBreak="break-word" mt={4} color="gray.400" fontSize="lg">
          I'm a design-centric Software Engineer.
        </Text>
      </StyledDiv>
    </div>
  );
};

export default Hero;
