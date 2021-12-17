import { motion, MotionProps } from "framer-motion";
import {
  Box,
  Text,
  Heading,
  chakra,
  shouldForwardProp,
} from "@chakra-ui/react";

const StyledDiv: any = chakra(motion.div, {
  shouldForwardProp: (prop) => shouldForwardProp(prop) || prop === "transition",
});

const Hero = () => {
  return (
    <div>
      <StyledDiv
        borderRadius="lg"
        p={3}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
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
