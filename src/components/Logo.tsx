import Image from "next/image";
import NextLink from "next/link";
import logo from "../../public/logo.png";
import { Button } from "@chakra-ui/react";

const Logo = () => {
  return (
    <NextLink href="/">
      <Button variant="link">
        <Image src={logo} width="30px" height="30px" />
      </Button>
    </NextLink>
  );
};
export default Logo;
