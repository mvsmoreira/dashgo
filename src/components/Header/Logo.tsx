import { Box, Text } from "@chakra-ui/react"
import Link from "next/link"

export const Logo = () => {
  return (
    <Link href="/dashboard" passHref>
      <Box as="a">
        <Text
          fontSize={["2xl", "3xl"]}
          fontWeight="bold"
          letterSpacing="tight"
          w="64"
        >
          dashgo
          <Text as="span" ml="1" color="pink.500">.</Text>
        </Text>
      </Box>
    </Link>
  )
}
