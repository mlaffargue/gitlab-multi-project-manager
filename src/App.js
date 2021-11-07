import {
  Badge,
  Box, Button, ChakraProvider,
  extendTheme, FormControl, FormLabel, Grid,
  GridItem, Modal, ModalBody,
  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Slider, SliderThumb, SliderTrack, Text, Textarea, useToast, useDisclosure, VStack
} from '@chakra-ui/react';
import React, { Component, useState } from 'react';
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


function ImportModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [settings, setSettings] = useState([]);
  const initialRef = React.useRef();

  const onSubmit = (event) => {
    event.preventDefault();
    try {
      let parsedSettings = JSON.parse(settings);
      // TODO: Refactor in a class
      if (parsedSettings.version === 0) {
        if (! Array.isArray(parsedSettings.projects)
          || ! Array.isArray(parsedSettings.repositories)) {
          toast({
            title: "Error during import",
            description: "Didn't manage to parse the configuration, please verify your file.",
            status: "error",
            duration: 3000,
            position: "top",
            isClosable: true,
          });
          return;
        }
        // TODO: more checks
        // Read config and update settings.
        localStorage.setItem('repositories', JSON.stringify(parsedSettings.repositories));
        localStorage.setItem('projects', JSON.stringify(parsedSettings.projects));
        window.location.reload();
      } else {
        toast({
          title: "Error during import",
          description: "Version is unknown, please verify your configuration file.",
          status: "error",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
        return;
      }
    } catch (error) {
      toast({
                title: "Error during import",
                description: "Something went wrong, please verify your configuration file.",
                status: "error",
                duration: 3000,
                position: "top",
                isClosable: true,
              });
      return;
    }
    

  }

  return (
    <>
      <Button colorScheme="brand" m={2} size="xs" textColor="brand.50" variant="outline" onClick={onOpen}>Import</Button>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
          <ModalOverlay />
          <ModalContent>
              <form onSubmit={onSubmit} >
              <ModalHeader>Import</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                  <FormControl id="settingsImport">
                      <FormLabel>Configuration</FormLabel>
                      <Textarea ref={initialRef} placeholder="Paste your configuration file" value={settings} onChange={(event) => setSettings(event.target.value)}/>
                  </FormControl>
              </ModalBody>

              <ModalFooter>
              <Button mr={3} onClick={onClose}>
                  Cancel
              </Button>
              <Button type="submit" colorScheme="brand" mr={3}>
                  Import
              </Button>
              </ModalFooter>
              </form>
          </ModalContent>
      </Modal> 
    </>
  )
}

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

  exportConfiguration = () => {
    let repositories = (localStorage.getItem('repositories') && JSON.parse(localStorage.getItem('repositories')) ) || [];
    let projects = (localStorage.getItem('projects') && JSON.parse(localStorage.getItem('projects')) ) || [];

    const blob = new Blob([
      JSON.stringify({
        version: 0,
        repositories: repositories,
        projects: projects
      })
    ]);

    const element = document.createElement("a");
    element.href = URL.createObjectURL(blob);
    element.download = "gmpm_settings_" + new Date().toJSON().slice(0,10).split`-`.join``;
    document.body.appendChild(element);
    element.click();
    element.remove();
  }

  importConfiguration = () => {

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
            <VStack w="100%" textAlign="center">
              <Badge w="90%" mt={4} textAlign="center" borderRadius="lg" px="2" colorScheme="yellow" variant="outline">
                  <Text fontSize="xx-small" >Configuration</Text>
              </Badge>
              <Box mt={8} borderRadius="lg" pl={4} pr={4} w="90%" border="1px solid white">
                <Button colorScheme="brand" m={2} size="xs" textColor="brand.50" variant="outline" onClick={this.exportConfiguration}>Export</Button>
                <ImportModal />
              </Box>

              <Badge w="90%" mt={4} textAlign="center" borderRadius="lg" px="2" colorScheme="yellow" variant="outline">
                  <Text fontSize="xx-small" >View settings</Text>
              </Badge>
              <Box mt={8} borderRadius="lg" pl={4} pr={4} w="90%" border="1px solid white">
                <Slider  defaultValue={0} min={0} max={2} step={1} onChange={this.updateDraftOption}>
                  <SliderTrack bg="brand.100">
                  </SliderTrack>
                  <SliderThumb boxSize={3}>
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
