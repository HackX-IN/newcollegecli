import { Spinner, VStack } from "@chakra-ui/react";
import React from "react";

import './style.css'


const Loader=({color='yellow.500'})=>{
    return(
        <VStack h={"100vh"} justifyContent="center">
        <div id='preloader'>
<div class='spinner'>
  <span class='ball-1'></span>
  <span class='ball-2'></span>
  <span class='ball-3'></span>
  <span class='ball-4'></span>
  <span class='ball-5'></span>
  <span class='ball-6'></span>
  <span class='ball-7'></span>
  <span class='ball-8'></span>
</div>
</div>
        </VStack>

    )
}

export default Loader;