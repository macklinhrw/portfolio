import {
  Flex,
  Box,
  Container,
  Heading,
  Stack,
  useColorModeValue,
  Link,
  Button,
} from "@chakra-ui/react";
import NextLink from "next/link";
import StyledDiv from "./StyledDiv";

const LinkItem = ({ href, path, _target, children, ...props }) => {
  const active = path === href;
  const inactiveColor = useColorModeValue("gray200", "whiteAlpha.900");
  return (
    <NextLink href={href} passHref>
      <Link
        p={2}
        bg={active ? "grassTeal" : undefined}
        color={active ? "white" : inactiveColor}
        _target={_target}
        {...props}
      >
        {children}
      </Link>
    </NextLink>
  );
};

const NavDelay = ({ children, delay = 0 }) => {
  return (
    <StyledDiv
      initial={{ y: -15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2, delay }}
    >
      {children}
    </StyledDiv>
  );
};

const Navbar = (props) => {
  const { path } = props;

  return (
    <Box
      as="nav"
      w="100%"
      zIndex={1}
      style={{ backdropFilter: "blur(10px)" }}
      {...props}
    >
      <Container
        display="flex"
        p={2}
        maxW="container.xl"
        wrap="wrap"
        justify="space-between"
      >
        <StyledDiv
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Heading as="h1" size="md" letterSpacing="tighter">
            Macklin
          </Heading>
        </StyledDiv>
        <Stack alignItems="center" ml="auto" spacing={5} direction="row">
          <NavDelay delay={0.2}>
            <LinkItem href="#about" path={path} _target="">
              About
            </LinkItem>
          </NavDelay>
          <NavDelay delay={0.3}>
            <LinkItem href="#experience" path={path} _target="">
              Experience
            </LinkItem>
          </NavDelay>
          <NavDelay delay={0.4}>
            <LinkItem href="#projects" path={path} _target="">
              Projects
            </LinkItem>
          </NavDelay>
          <NavDelay delay={0.5}>
            <LinkItem href="#contact" path={path} _target="">
              Contact
            </LinkItem>
          </NavDelay>
          <NavDelay delay={0.6}>
            <Button variant="outline">Résumé</Button>
          </NavDelay>
        </Stack>
      </Container>
    </Box>
  );
};

export default Navbar;
