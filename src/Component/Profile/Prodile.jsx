import { Avatar, Button, Container, Heading, HStack, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RemoveFromPlaylist, updateProfilePic } from '../../redux/actions/profile'
import { CancelSubscribe, loadUser } from '../../redux/actions/userAction'
import { fileupload } from '../Auth/Register'

const Prodile = ({user}) => {
    
        


        const dispatch=useDispatch();
        const {loading,error,message}=useSelector(state=>state.profile)
        const {loading:sloading,error:serror,message:smessage}=useSelector(state=>state.subscription)

        const removefromPlaylist= async (id) =>{
           await dispatch(RemoveFromPlaylist(id),
           dispatch(loadUser()))
            
        }



        const changeImgSubmit=async(e,image)=>{
            e.preventDefault()
    const myForm=new FormData();
    myForm.append('file',image);

    await dispatch(updateProfilePic(myForm));
    dispatch(loadUser())
        };

        const CancelSubscribeHandler=()=>{

            dispatch(CancelSubscribe())
            dispatch(loadUser())
           

        }
  
        useEffect(()=>{

            if(error)
            {
              toast.error(error)
              dispatch({type:"clearError"})
            }
            if(message){
              toast.success(message)
              dispatch({type:"clearMessage"})
            }

            if(serror)
            {
              toast.error(serror)
              dispatch({type:"clearError"})
            }
            if(smessage){
              toast.success(smessage)
              dispatch({type:"clearMessage"})
              dispatch(loadUser());
            }






      
          },[dispatch,error,message,serror,smessage])
      


      const{isOpen,onClose,onOpen}=useDisclosure();

    

  return (
    <Container minH={'95vh'} maxW='container.lg' py={'8'}>
        <Heading m={'8'} children='Profile' textTransform={'upper-case'}/>
        <Stack justifyContent={'flex-start'} direction={['column','row']} alignItems={'center'} spacing={['8','16']} p='8'>
            <VStack>
                <Avatar boxSize={'48'} src={user.avatar.url}/>
                <Button  onClick={onOpen} colorScheme={'yellow'} variant="ghost">Change Photo</Button>
            </VStack>

            <VStack spacing={'4'} alignItems={['center','flex-start']} >
<HStack>

    <Text children='Name' fontWeight={'bold'}/>
    <Text children={user.name}/>

</HStack>
<HStack>

    <Text children='Email' fontWeight={'bold'}/>
    <Text children={user.email}/>
    
</HStack>
<HStack>

    <Text children='Created At' fontWeight={'bold'}/>
    <Text children={user.createdAt.split("T")[0]}/>
    
</HStack>

   {
    (user.role !=='admin' && user.role !== 'newian' )&& (
    <HStack>
        <Text children="Subscription " fontWeight={'bold'}/>

        {
        user.subscription && user.subscription.status === "active" ? (
            <Button onClick={CancelSubscribeHandler} isLoading={sloading} colorScheme={'yellow.500'} 
            variant={'ghost'}>Cancel Subscription</Button>
        ):(
            <Link to="/subscribe">
                <Button colorScheme={'yellow'}>Subscribe</Button>
            </Link>
        )}
  
    
</HStack> )}

<Stack direction={['column','row']} alignItems={'center'}>
    <Link to="/updateprofile"><Button>Update Profile</Button></Link>
    <Link to="/changepassword"><Button>Change Password</Button></Link>


</Stack>

            </VStack>

        </Stack>

        <Heading children="Playlist" size={'md'} my={'8'}/>

        {
            user.playlist.length > 0 &&(
                <Stack direction={['column','row']} alignItems={'center'} flexWrap="wrap" p={'4'}>
                    {
                        user.playlist.map((item,index)=>(
                            <VStack w={'48'} m="2" key={item.course}>
                                <Image boxSize={'full'} objectFit={'contain'} src={item.poster}/>
                                <HStack>
                                    <Link to={`/course/${item.course}`}><Button variant={"ghost"} colorScheme="yellow">Watch Now</Button></Link>
                                    <Button onClick={()=>removefromPlaylist(item.course)}>
                                        <RiDeleteBin7Fill/>
                                    </Button>
                                </HStack>
                            </VStack>
                        ))
                    }
                </Stack>
            )
        }
        <ChangePhoto changeImgSubmit={changeImgSubmit} isOpen={isOpen} onClose={onClose} loading={loading}/>
       
    </Container>

  )
}

export default Prodile

function ChangePhoto({isOpen,onClose,changeImgSubmit,loading}){

    const [image,setImage]=useState('');
    const [imageprev,setImageprev]=useState('');
    const changeimage=(e)=>{
        const file = e.target.files[0];
        const reader=new FileReader();

        reader.readAsDataURL(file)
        reader.onloadend=()=>{
            setImageprev(reader.result)
            setImage(file)
        }

    }
    const Closehandler=()=>{
        onclose();
        setImageprev("");
        setImage("");
    }
    return(
        <Modal isOpen={isOpen} onClose={Closehandler}>
        <ModalOverlay backdropFilter={'blur(10px)'}/>
        <ModalContent>
            <ModalHeader>Change Photo</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
                <Container>
                    <form onSubmit={(e)=>changeImgSubmit(e,image)}>
                        <VStack spacing={'8'}>
                            {imageprev &&
                            <Avatar src={imageprev} boxSize={'48'}/>}
                            <Input type={'file'} css={{"&::file-selector-button":fileupload}} onChange={changeimage}/>
                            <Button  isLoading={loading} w={'full'} colorScheme={'yellow'} type={'submit'}>Change</Button>

                        </VStack>
                    </form>

                    
                </Container>



            </ModalBody>

            <ModalFooter>
                <Button mr={'3'} onClick={Closehandler}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>


    
        )
        
}
