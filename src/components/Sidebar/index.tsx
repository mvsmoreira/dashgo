import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useBreakpointValue } from "@chakra-ui/react"
import { useSidebarDrawer } from "../contexts/SidebarDrawerContext"
import { Navbar } from "./Navbar"

const Sidebar = () => {
  const { isOpen, onClose } = useSidebarDrawer()

  const isDrawerNavbar = useBreakpointValue({
    base: true,
    lg: false,
  })

  if (isDrawerNavbar) {
    return (
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay>
          <DrawerContent bg="gray.800" p="4">
            <DrawerCloseButton mt="6" />
            <DrawerHeader>Navegação</DrawerHeader>
            <DrawerBody>
              <Navbar />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    )
  }

  return (
    <Box as="aside" w="64" mr="8">
      <Navbar />
    </Box>
  )
}

export default Sidebar
