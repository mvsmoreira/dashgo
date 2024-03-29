import { Box, Stack, Text } from "@chakra-ui/react"
import { PaginationItem } from "./PaginationItem"

interface PaginationProps {
  totalCountOfRegisters: number | undefined,
  registersPerPage?: number,
  currentPage?: number,
  onPageChange: (page: number) => void
}

const siblingsCount = 1

const generatePagesArray = (from: number, to: number) => {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1
    })
    .filter(page => page > 0)
}

const Pagination = ({
  totalCountOfRegisters,
  currentPage = 1,
  onPageChange,
  registersPerPage = 10
}: PaginationProps) => {
  const lastPage = Math.ceil(totalCountOfRegisters! / registersPerPage)

  const previousPages = currentPage > 1
    ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
    : []

  const nextPages = currentPage < lastPage
    ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
    : []

  return (
    <Stack
      direction={["column", "row"]}
      mt="8"
      justify="space-between"
      align="center"
      spacing="6"
    >
      <Box>
        <strong>{currentPage * registersPerPage - (registersPerPage - 1)}</strong> - <strong>{currentPage === lastPage ? totalCountOfRegisters : currentPage * registersPerPage}</strong> de <strong>{totalCountOfRegisters}</strong>
      </Box>
      <Stack direction="row" spacing="2">

        {currentPage > (1 + siblingsCount) && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1} />
            {currentPage > (2 + siblingsCount) && (
              <Text color='gray.300' width='8' textAlign='center'>...</Text>
            )}
          </>
        )}

        {previousPages.length > 0 && previousPages.map(page => (
          <PaginationItem onPageChange={onPageChange} key={page} number={page} />
        ))}

        <PaginationItem onPageChange={onPageChange} isCurrent number={currentPage} />

        {nextPages.length > 0 && nextPages.map(page => (
          <PaginationItem onPageChange={onPageChange} key={page} number={page} />
        ))}

        {(currentPage + siblingsCount) < lastPage && (
          <>
            {(currentPage + 1 + siblingsCount) < lastPage && (
              <Text color='gray.300' width='8' textAlign='center'>...</Text>
            )}
            <PaginationItem onPageChange={onPageChange} number={lastPage} />
          </>
        )}

      </Stack>
    </Stack>
  )
}

export default Pagination
