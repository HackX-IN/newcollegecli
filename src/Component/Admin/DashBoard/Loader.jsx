

import { VStack } from "@chakra-ui/react";
import React from "react";

import './style1.css'


const Loader=({color='yellow.500'})=>{
    return(
        <VStack h={"100vh"} justifyContent="center">
<div class="dashboard-loader-wrapper">
<div class="dashboard-loader">
  <span class="bars"></span>
  <span class="text">Loading Dashboard</span>
</div>
</div>
        </VStack>

    )
}

export default Loader;