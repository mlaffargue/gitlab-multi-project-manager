import {
  Badge,
  Box,
  Center, ChakraProvider,
  extendTheme, Grid,
  GridItem, Text,
  Slider, SliderThumb, SliderTrack, VStack
} from '@chakra-ui/react';
import React, { Component, useEffect, useState } from 'react';
import { CgArrowsShrinkH } from 'react-icons/cg';
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import GmpmMenu from './components/menu/Menu';
import DraftOptionEnum from './model/DraftOptionEnum';
import MrAnalysisPage from './pages/MrAnalysisPage';


const theme = extendTheme({
  colors: {
    brand: {
      50: "#a9d6e5",
      100: "#89c2d9",
      200: "#61a5c2",
      300: "#468faf",
      400: "#2c7da0",
      500: "#2a6f97",
      600: "#014f86",
      700: "#01497c",
      800: "#013a63",
      900: "#012a4a",
    }
  },
})


class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      draftOption: DraftOptionEnum.NORMAL
    }
  }

  updateDraftOption = (idx) => {
    this.setState(prevState => ({
      ...prevState,
      draftOption: DraftOptionEnum.fromIdx(idx)
    }));
  }

  render = () => (
    <ChakraProvider theme={theme}>
    <Router>
        <Grid
            h="100vh" 
          templateColumns="repeat(2, 1fr)"
        >
          <GridItem w="10vw" bg="brand.500">
            <GmpmMenu/>
            <VStack w="100%">
              <Badge w="90%" mt={4} textAlign="center" borderRadius="lg" px="2" colorScheme="yellow" variant="outline">
                  <Text fontSize="xx-small" >View settings</Text>
              </Badge>
                <Box mt={8} borderRadius="lg" p={4} w="90%" border="1px solid white">
                <Slider  defaultValue={0} min={0} max={2} step={1} onChange={this.updateDraftOption}>
                  <SliderTrack bg="brand.100">
                  </SliderTrack>
                  <SliderThumb boxSize={4}>
                    <Box color="tomato" as={CgArrowsShrinkH} />
                  </SliderThumb>
                </Slider>
                <Box fontSize="xs" textAlign="center">{this.state.draftOption.text}</Box>
              </Box>
            </VStack>
          </GridItem>
          <GridItem w="90vw"bg="papayawhip">
            <Switch>
              <Route path="/">
                <MrAnalysisPage draftOption={this.state.draftOption}/>
              </Route>
            </Switch>
          </GridItem>
        </Grid>
      </Router>
    </ChakraProvider>
  )
}

export default App;
