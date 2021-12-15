import Head from "next/head"
import { ChakraProvider } from "@chakra-ui/react"

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Macklin</title>
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App;
