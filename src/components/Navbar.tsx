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
        maxW="container.md"
        wrap="wrap"
        justify="space-between"
      >
        <Flex align="center">
          <Heading as="h1" size="md" letterSpacing="tighter">
            Macklin
          </Heading>
        </Flex>
        <Stack alignItems="center" ml="auto" spacing={5} direction="row">
          <LinkItem href="#about" path={path} _target="">
            About
          </LinkItem>
          <LinkItem href="#experience" path={path} _target="">
            Experience
          </LinkItem>
          <LinkItem href="#projects" path={path} _target="">
            Projects
          </LinkItem>
          <LinkItem href="#contact" path={path} _target="">
            Contact
          </LinkItem>
          <Button variant="outline">Resume</Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Navbar;
