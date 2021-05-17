import { Stack } from '@chakra-ui/react'
import { 
  RiContactsLine, 
  RiDashboardLine, 
  RiGitMergeLine, 
  RiInputMethodLine 
} from 'react-icons/ri'
import { NavLink } from './NavLink'
import { NavSeciton } from './NavSection'


export function SidebarNav() {
  return (
    <Stack spacing="10" align="flex-start">
      <NavSeciton title="GENERAL">
        <NavLink href="/dashboard" icon={RiDashboardLine}>Dashboard</NavLink>
        <NavLink href="/users" icon={RiContactsLine}>Users</NavLink>
      </NavSeciton>
      
      <NavSeciton title="AUTOMATION">        
        <NavLink href="/forms" icon={RiInputMethodLine}>Forms</NavLink>
        <NavLink href="/automation" icon={RiGitMergeLine}>Automation</NavLink>
      </NavSeciton>
    </Stack>
  );
}