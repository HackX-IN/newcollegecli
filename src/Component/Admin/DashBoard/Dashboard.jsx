import { Box, Grid, Heading, HStack, Progress, Stack, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri';
import cursor from '../../Assets/images/cursor.ico';
import Sidebar from '../Sidebar';
import { Doughnut1, LIneChart } from './Chart';
import {useDispatch, useSelector} from 'react-redux'
import { getDashboardStats } from '../../../redux/actions/admin';
import Loader from './Loader'
import './dashboard.css';




const Dashboard = () => {


    const dispatch=useDispatch()

    const {loading,
        stats,
        userscount,
subscriptioncount,
viewscount,
subscriptionPercetage,
usersPercetage,
viewsPercetage,
viewsProfit,
usersProfit,
subscriptionProfit }=useSelector(state=>state.admin)

    useEffect(()=>{
        dispatch(getDashboardStats())

    },[dispatch])





    const Bar=({title,value,profit})=>(
        <Box py={'4'} px={['0','20']}>
        <Heading size={'sm'} children={title} mb="2"/>
        <HStack w={'full'} alignItems="center">
            <Text children={profit?'0%':`${value}%`}/>
            <Progress hasStripe w={'full'} value={profit?value:0} />

            <Text children={`${value>100?value:100}%`}/>

        </HStack>


    </Box>
    )
   
    

  return (

 <Grid css={{
    cursor:`url(${cursor}),default`,
 }} minH={'100vh'} templateColumns={['1fr','5fr 1fr']}>

 {
    loading?<Loader color='purple.500'/>:(
        <Box boxSizing='border-box' py={'16'} px={['4','0']}>

<Text textAlign={'center'} opacity={"0.5"} children={`Last Change was On ${String(new Date()).split('G')[0]}`}/>
<Heading className='dash' children={"DashBoard"} mb="16" ml={["0",'16']} textAlign={['center','left']}/>
<Stack direction={['column','row']} minH={'24'} justifyContent={'space-evenly'}>


<Databox title="views" qty={viewscount} qtypercentage={viewsPercetage} profit={viewsProfit}/>
<Databox title="users" qty={userscount} qtypercentage={usersPercetage} profit={usersProfit}/>
<Databox title="subscription" qty={subscriptioncount} qtypercentage={subscriptionPercetage} profit={subscriptionProfit}/>

        
    </Stack>
    <Box m={['8','16']} borderRadius="lg" p={['0','16']} mt={["4",'16']} boxShadow={"-2px 0 10px rgba(107,70,193,0.5)"}>
        <Heading textAlign={['center','left']} size='md' children="View Graph" ml={['0','16']} p={['8','0']}/>
       
       
        <LIneChart views={stats && stats.map(item=>(item.views))}  />

        

      
    </Box>


        <Grid templateColumns={['1fr','2fr 1fr']}>
            <Box p={'4'}>
                <Heading textAlign={['center','left']} size="md" children="Progress bar" my={'8'} ml={['0','16']}/>
              
                
                
                <Box>

                    <Bar profit={viewsProfit} title='Views' value={viewsPercetage}/>
                    <Bar profit={usersProfit} title='Users' value={usersPercetage}/>
                    <Bar profit={subscriptionProfit} title='Subscription' value={subscriptionPercetage}/>
                
                </Box>


            </Box>

            <Box p={['0','16']} boxSizing={'border-box'} py="4">
                <Heading textAlign={'center'} size="md" children="Users" mb={'4'}/>
                <Doughnut1 users={[subscriptioncount,userscount-subscriptioncount]} />  
            </Box> 
          

        </Grid>


 </Box>
    )
 }


   
<Sidebar/>

 </Grid>
  )
}

export default Dashboard

const Databox=({qty,qtypercentage,title,profit})=>(
    
    <Box w={["full","20%"]} boxShadow={"-2px 0 10px rgba(107,70,193,0.5)"} p="8" borderRadius={'lg'}>
    <Text children={title}/>
   <HStack spacing={'6'}>
    <Text fontSize={'2xl'} fontWeight='bold' children={qty}/>        
    <HStack>
        <Text children={`${qtypercentage}%`}/>
        {profit?<RiArrowUpLine color='green'/>:(
            <RiArrowDownLine color='red'/>
        )}
    </HStack>

   </HStack>
   <Heading opacity={'0.6'} fontSize={'xs'} children='Since last Month'/>
   </Box>


        )

        