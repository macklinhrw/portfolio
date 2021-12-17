import { motion } from "framer-motion";
import { chakra, shouldForwardProp } from "@chakra-ui/react";

const StyledDiv: any = chakra(motion.div, {
  shouldForwardProp: (prop) => shouldForwardProp(prop) || prop === "transition",
});

export default StyledDiv;
