import { Flex } from "@chakra-ui/react"
import Logo from "./Logo"
import Profile from "./Profile"
import Search from "./Search"
import WidgetBar from "./WidgetBar"

const Header = () => {
  return (
    <Flex
      as="header"
      w="100%"
      maxW={1480}
      h="20"
      mx="auto"
      mt="4"
      px="24"
      align="center"
    >
      <Logo />

      <Search />

      <Flex
        align="center"
        ml="auto"
      >
        <WidgetBar />

        <Profile />
      </Flex>
    </Flex>
  )
}

export default Header
