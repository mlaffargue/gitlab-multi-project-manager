import { AddIcon } from "@chakra-ui/icons";
import {
    Box,
    Button, Flex, FormControl, FormLabel, IconButton, Input, MenuItem, Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure, useToast
} from "@chakra-ui/react";
import React, { useState } from 'react';
import { GoSettings } from 'react-icons/go';
import RepositoryMdl from "../model/RepositoryMdl";



function GmpmSettings(){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [token, setToken] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [optionList, setOptionList] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [repositories, setRepositories] = useState(
        (localStorage.getItem('repositories') && JSON.parse(localStorage.getItem('repositories')) ) || []
      );

    /*
     * Option list management 
     */
    const deleteOption = (value) => {
        const remainingRepositories = repositories.filter(repository => repository.name !== value);
        setRepositories(remainingRepositories);
        localStorage.setItem('repositories', JSON.stringify(remainingRepositories));
        stopEditing();
    }

    const updateOptions = () => {
        let options = repositories.slice();
        options = options.map((repository) => <option key={repository.name}>{repository.name}</option>);
        setOptionList(options);
    }

    const onOptionSelected = (value) => {
        if (value === '') return;
        setSelectedOption(value);
        startEditing();
        const selectedRepository = new RepositoryMdl(repositories.filter(repository => repository.name === value).pop());
        setName(selectedRepository.name);
        setToken(selectedRepository.token);
        setUrl(selectedRepository.url);
    }

    // Update options when repository list changes
    React.useEffect(updateOptions, [repositories]);

    /*
     * Edition
     */
    const startEditing = () => {       
        clearForm();
        setIsEditing(true);
    }

    const stopEditing = () => {
        setIsEditing(false);
        clearForm();
        setSelectedOption('');
    }

    const clearForm = () => {
        setName('');
        setUrl('');
        setToken('');
    }


    /**
     * Add a new Repository
     */
    const onSubmit = (event) => {
        event.preventDefault();

        const foundRepository = repositories.filter(repository => repository.name === name);
        // Don't allow name conflict on creation
        if (selectedOption === '' && foundRepository.length > 0) {
            toast({
                title: "Repository already exist",
                description: "The repository configuration : " + name + " already exist",
                status: "error",
                duration: 3000,
                position: "top",
                isClosable: true,
              });
              return;
        }
        const repository = new RepositoryMdl();
        repository.name = name;
        repository.url = url;
        repository.token = token;
        
        // Remove existing repository
        const updatedRepositories = repositories.filter((repo) => repo.name !== name);

        updatedRepositories.push(repository);
        setRepositories(updatedRepositories);
        localStorage.setItem('repositories', JSON.stringify(updatedRepositories));
        
        updateOptions();
        stopEditing();
    }



    return (
        <>
        <MenuItem onClick={onOpen} icon={<GoSettings />}>
            Settings...
        </MenuItem>
        
        <Modal closeOnOverlayClick={false}  isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={onSubmit} >
                <ModalHeader>Configuration</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex>
                        <FormControl id="gitlabRepositoryList">
                            <FormLabel>Gitlab Repositories</FormLabel>
                            <Select placeholder="Modify a Gitlab Repository"
                                    disabled={isEditing}
                                    value={selectedOption}
                                    onChange={e => onOptionSelected(e.target.value)}>
                                {optionList}
                            </Select>
                        </FormControl>
                        
                        <IconButton icon={<AddIcon/>} 
                            cursor="pointer"
                            title="Add a new gitlab repository" 
                            size="sm" 
                            ml={4} mt={9}
                            colorScheme="brand"
                            onClick={startEditing}
                            disabled={isEditing}/>
                    </Flex>
                    <Box mb={4}></Box>
                    
                    <FormControl id="gitlabRepository" hidden={!isEditing}>
                        <FormLabel>Name</FormLabel>
                        <Input value={name} variant={isEditing?"outline":"flushed"} id="name" disabled={!isEditing || selectedOption !== ''} onChange={event => setName(event.currentTarget.value)}/>
                        <FormLabel>URL</FormLabel>
                        <Input value={url} variant={isEditing?"outline":"flushed"} id="url"  disabled={!isEditing} onChange={event => setUrl(event.currentTarget.value)}/>
                        <FormLabel>Token</FormLabel>
                        <Input value={token} variant={isEditing?"outline":"flushed"} id="token"  disabled={!isEditing} onChange={event => setToken(event.currentTarget.value)}/>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                <Button mr={3} onClick={stopEditing} hidden={!isEditing}>
                    Cancel
                </Button>
                <Button colorScheme="red" mr={3} hidden={!isEditing || selectedOption===''} onClick={e => deleteOption(selectedOption)}>
                    Delete
                </Button>
                <Button type="submit" colorScheme="brand" mr={3} hidden={!isEditing}>
                    Save
                </Button>
                <Button mr={3} onClick={onClose} hidden={isEditing}>
                    Close
                </Button>
                </ModalFooter>
                </form>
            </ModalContent>
        </Modal>   
        </>
    );
}


export default GmpmSettings;