
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure, VStack ,HStack} from '@chakra-ui/react'
import React from 'react'

import {ColorModeSwitcher} from '../../../ColorModeSwitcher'
import {RiDashboardFill, RiLogoutBoxLine, RiMenu4Line} from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import '../style.css'
import { Logout } from '../../../redux/actions/userAction'
import { useLocation } from 'react-router-dom'
import {AiFillHome,AiFillInfoCircle} from 'react-icons/ai'
import {MdVideoLibrary} from 'react-icons/md'
import {IoMdHelpCircle} from 'react-icons/io'
import {MdMail} from 'react-icons/md'
import {FaUserEdit} from 'react-icons/fa'
import {CgLogIn} from 'react-icons/cg'
import {GrUserNew} from 'react-icons/gr'
import '../style.css'






const Header = ({isAuthenticated=false,user}) => {

    const location=useLocation();
    

    const{isOpen,onOpen,onClose}=useDisclosure();


    const dispatch=useDispatch()

    

const logouthandler=()=>{

    onClose();

    dispatch(Logout())
}

  return (
    <>
    <ColorModeSwitcher/>

    <Button onClick={onOpen} zIndex={'overlay'}
     colorScheme={'yellow'} width="12" height={'12'} rounded='full' top="6" left="6" position={'fixed'} >

        <RiMenu4Line/>

    </Button>

    <Drawer placement='left' isOpen={isOpen} onClose={onClose} >
        <DrawerOverlay/>
        <DrawerContent w={"200px"}>
            <DrawerHeader borderBottomWidth={'1px'}>THE NEW COLLEGE COURSES </DrawerHeader>
            <DrawerBody >
                     <VStack className='ho' justifyContent={'flex-start'} spacing={'4'} alignItems={'center'}>
                         <Link  onClick={onClose} to='/' >
            <Button className='go'   variant={'ghost'}><AiFillHome className='co' style={{marginRight:"10px"}}/>   Home</Button>
        </Link>
        <Link onClick={onClose} to='/course'>
            <Button className='go' variant={'ghost'}><MdVideoLibrary className='co' style={{marginRight:"10px"}}/>   Browse a Course</Button>
        </Link>
        <Link onClick={onClose} to='/request'>
            <Button className='go' variant={'ghost'}><IoMdHelpCircle className='co' style={{marginRight:"10px"}}/>   Request A Course</Button>
        </Link>
        <Link onClick={onClose} to='/contact'>
            <Button className='go' variant={'ghost'}> <MdMail className='co' style={{marginRight:"10px"}}/>Contact Us</Button>
        </Link>
        <Link onClick={onClose} to='/About'>
            <Button className='go' variant={'ghost'}><AiFillInfoCircle style={{marginRight:"10px"}}/>About</Button>
        </Link>
            
                       
                    
                    <HStack justifyContent={'space-evenly'} bottom='2rem' position={'absolute'} width={'80%'}  >
                        {isAuthenticated?(<>
                        <VStack>
                            <HStack>
                            <Link onClick={onClose} to='/profile'>
                          <Button className='lo' colorScheme={'yellow'}><FaUserEdit style={{marginRight:"5px"}}/>Profile</Button>

                        </Link>
                        
                        <Button className='fo'  variant={'ghost'} onClick={logouthandler}>
                            <RiLogoutBoxLine style={{marginRight:"5px"}}/>
                            Logout</Button>
                            </HStack>

                            {
                                user && user.role=== "admin" && <Link to="/admin/dashboard">
                                    <Button onClick={onClose} colorScheme={'purple'} variant='ghost'>
                                        <RiDashboardFill style={{margin:"4px"}}/>DashBoard

                                    </Button>


                                </Link>
                            }



                        </VStack>
                        
                        
                        
                        </>):(<>

                        <Link onClick={onClose} to='/login'>
                        <Button className='lo' colorScheme={'yellow'}><CgLogIn style={{marginRight:"5px"}}/>Login</Button>

                        </Link>
                        <p>OR</p>
                        <Link onClick={onClose} to='/signup'>
                        <Button className='fo'  colorScheme={'yellow'}><GrUserNew style={{marginRight:"5px"}}/>SignUp</Button>

                        </Link>
                        
                        </>)}



                    </HStack>


                </VStack>


            </DrawerBody>
        </DrawerContent>

    </Drawer>

    </>
  )
}

export default Header

