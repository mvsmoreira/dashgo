import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react"
import { RiMenuLine } from "react-icons/ri"
import { useSidebarDrawer } from "../contexts/SidebarDrawerContext"
import Logo from "./Logo"
import Profile from "./Profile"
import Search from "./Search"
import WidgetBar from "./WidgetBar"

const Header = () => {
  const { onOpen } = useSidebarDrawer()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })
  return (
    <Flex
      as="header"
      w="100%"
      maxW={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Open Sidebar"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        >

        </IconButton>
      )}

      <Logo />

      {isWideVersion && <Search />}

      <Flex
        align="center"
        ml="auto"
      >
        <WidgetBar />

        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  )
}

export default Header
