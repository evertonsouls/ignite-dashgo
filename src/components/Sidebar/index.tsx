import { Box, Stack, Link, Text, Icon } from '@chakra-ui/react'
import { 
  RiContactsLine, 
  RiDashboardLine, 
  RiGitMergeLine, 
  RiInputMethodLine 
} from 'react-icons/ri'
import { NavLink } from './NavLink'
import { NavSeciton } from './NavSection'

export function Sidebar() {
  return (
    <Box as="aside" w="64" mr="8">
      <Stack spacing="12" align="flex-start">
        <NavSeciton title="GENERAL">
          <NavLink icon={RiDashboardLine}>Dashboard</NavLink>
          <NavLink icon={RiContactsLine}>Users</NavLink>
        </NavSeciton>
        
        <NavSeciton title="AUTOMATION">        
          <NavLink icon={RiInputMethodLine}>Forms</NavLink>
          <NavLink icon={RiGitMergeLine}>Automation</NavLink>
        </NavSeciton>
      </Stack>
    </Box>
  )
}