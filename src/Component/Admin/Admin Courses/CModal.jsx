import { ButtonGroup, HStack, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger,Box, Button, Grid, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, VStack, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { GiCancel } from 'react-icons/gi'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { TiWarning } from 'react-icons/ti'
import { Link } from 'react-router-dom'
import './s.css'



const CModal = ({isOpen,onClose,id,deleteButtonHandler,addLecturehand,courseTitle,lectures=[],loading}) => {


    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")
    const [video,setVideo]=useState("")
    const [videoprev,setVideoprev]=useState("")
    const handleClose=()=>{
        setTitle=("");
        setDescription=("");
        setVideo=("");
        setVideoprev("");
        onClose();
    }

    const videohandler=(e)=>{
        const file = e.target.files[0];
        const reader=new FileReader();
     
        reader.readAsDataURL(file)
        reader.onloadend=()=>{
            setVideoprev(reader.result)
            setVideo(file)
        }
     
     }



  return (

   <Modal isOpen={isOpen} size='full' onClose={handleClose} scrollBehavior={'outside'}>
    <ModalOverlay/>
    <ModalContent>

        <ModalHeader>{courseTitle}</ModalHeader>

        <ModalCloseButton onClick={onClose} />

        <ModalBody p={'16'} >
            <Grid templateColumns={['1fr','3fr 1fr']}>
                <Box px={['0','16']}>
                    <Box my={'5'}>
                        <Heading children={courseTitle}/>
                        <Heading children={`#${id}`} size="md" opacity={'0.4'}/>
                    </Box>

                    <Heading size={'lg'} children={'Lectures'}/>

                    {lectures.map((item,i)=>(
                         <VideoCard key={i} title={item.title} description={item.description} num={i+1} 
                         lectureId={item._id} courseId={id} deleteButtonHandler={deleteButtonHandler} loading={loading} />
                         

                    ))}

                  


                </Box>

                <Box>
                    <form onSubmit={e=>addLecturehand(e,id,title,description,video)} onClose={handleClose} >

                        <VStack spacing={'4'}>


                            <Heading children="Add Lectures" size={'md'} textTransform="upper-case"/>
                            <Input focusBorderColor='purple.300' placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
                            <Input focusBorderColor='purple.300' placeholder='Description' value={description} onChange={(e)=>setDescription(e.target.value)}/>
                            <Input accept='video/mp4' required  type={'file'} focusBorderColor={'purple.500'} css={{"&::file-selector-button":{
       cursor:"pointer",marginLeft:"-5%",
       width:"110%",border:"none",height:"100%",
       color:"purple", backgroundColor:"white"
   }}} onChange={videohandler} />
   {
    videoprev&&(
        <video src={videoprev} controlsList='no download' controls onClose={handleClose}></video>
    )
   }
   <Button isLoading={loading}  w={'full'} colorScheme={"purple"} type="submit">Upload</Button>




                        </VStack>



                    </form>
                </Box>

            </Grid>

        </ModalBody>

        <ModalFooter>
            <Button onClick={onClose}>Close</Button>
        </ModalFooter>
    </ModalContent>


   </Modal>
  )
}

export default CModal


function VideoCard({title,description,num,lectureId,courseId,deleteButtonHandler,loading}){
    const { isOpen, onToggle, onClose } = useDisclosure()
    return <Stack direction={['column','row']} my='8' borderRadius={'lg'}
     boxShadow={'0 0 10px rgba(107,70,193,0.5)'} justifyContent={['flex-start','space-between']} p={['4','8']}>


        <Box mr={20}><Heading size={'sm'} children={`#${num} ${title}`}/>
        <Text children={description}/>
        
        </Box>

        <Button  mr={5} onClick={onToggle} className='ho'>
               <RiDeleteBin7Fill/></Button>
      <Popover
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={onClose}
        placement='left'
        closeOnBlur={false}
        
      >
        <PopoverTrigger   >
          <Button colorScheme='red'><TiWarning /></Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight='semibold'></PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            Are you sure you want to delete this Lecture?
          </PopoverBody>
          <PopoverFooter
           display='flex' justifyContent='flex-end'>
            <ButtonGroup  size='sm'>
               <Link to="/admin/dashboard">
              <Button variant='outline'><GiCancel /></Button></Link>
              <Button isLoading={loading} color={'purple.700'} onClick={()=>deleteButtonHandler(courseId,lectureId)}>
            <RiDeleteBin7Fill/>
        </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>


        




    </Stack>
}