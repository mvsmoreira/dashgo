import { Avatar, Box, Flex, Text } from "@chakra-ui/react"

interface ProfileProps {
  showProfileData?: boolean
}

const Profile = ({ showProfileData = true }: ProfileProps) => {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Vinicius Moreira</Text>
          <Text color="gray.300" fontSize="small">
            mvs.moreira93@gmail.com
          </Text>
        </Box>
      )}

      <Avatar size="md" name="Vinicius Moreira" src="https://github.com/mvsmoreira.png" />

    </Flex>
  )
}

export default Profile
