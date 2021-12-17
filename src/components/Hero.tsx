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
      <Box borderRadius="lg" p={3} delay={0.1}>
        <Heading as="h2" variant="" my={3}>
          Macklin Reeve-Wilson
        </Heading>
        <Heading as="h2" color="gray.400">
          Software Engineer
        </Heading>
        <motion.div animate={{}}></motion.div>
        <StyledDiv
          animate={{ x: 100 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          Test
        </StyledDiv>
      </Box>
    </div>
  );
};

export default Hero;
