import { AddIcon } from '@chakra-ui/icons';
import {
    Button, Flex, FormControl, FormLabel, IconButton, Input, Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Spacer, useDisclosure, Wrap
} from "@chakra-ui/react";
import React, { Component, useEffect, useRef, useState } from 'react';
import ProjectInfo from '../components/gitlab/ProjectInfo';
import DraftOptionEnum from '../model/DraftOptionEnum';
import ProjectMdl from '../model/ProjectMdl';



function AddProjectButton(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [optionList, setOptionList] = useState([]);
    let repositories = (localStorage.getItem('repositories') && JSON.parse(localStorage.getItem('repositories')) ) || [];
    const repositoriesRef = useRef(repositories);

    useEffect(() => {
        let options = repositoriesRef.current.slice();
        options = options.map((repository) => <option key={repository.name}>{repository.name}</option>);
        setOptionList(options);
    }, [isOpen]);
    
    const [selectedRepository, setSelectedRepository] = useState("");
    const [projectId, setProjectId] = useState("");

    const onSelectRepository = (event) => {
        const selectedValue = event.target.value;
        setSelectedRepository(selectedValue);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const project = new ProjectMdl();
        project.id = projectId;
        project.repository = selectedRepository;
        props.addProject(project);
    }

    return (
        <>
        
        <IconButton
                    mt={5}
                    mr={5}
                    colorScheme="brand"
                    icon={<AddIcon />}
                    onClick={onOpen}
                    />
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <form onSubmit={onSubmit} >
                <ModalHeader>Add a new project</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Repository</FormLabel>
                        <Select placeholder="Gitlab Repository"
                                value={selectedRepository}
                                onChange={onSelectRepository}>
                            {optionList}
                        </Select>
                        <FormLabel>Project ID</FormLabel>
                        <Input value={projectId}  onChange={event => setProjectId(event.currentTarget.value)}/>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                <Button mr={3} onClick={onClose}>
                    Cancel
                </Button>
                <Button type="submit" colorScheme="brand" mr={3}>
                    Add
                </Button>
                </ModalFooter>
            </form>
            </ModalContent>
        </Modal>
        </>
    );
}


class MrAnalysisPage extends Component {
    constructor(props) {
        super(props);
        const projects = (localStorage.getItem('projects') && JSON.parse(localStorage.getItem('projects')) ) || [];
        this.state = { 
            projects: projects,
            draftOption: props.draftOption
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            ...prevState,
            draftOption: nextProps.draftOption
        };
    }

    updateProjects = (newProjectList) => {
        this.setState(prevState => ({
            ...prevState,
            projects: newProjectList
        }));
        localStorage.setItem('projects', JSON.stringify(newProjectList))
    }

    addProject = (newProject) => {
        const updatedProjectList = this.state.projects.concat(newProject);
        this.updateProjects(updatedProjectList);
    }

    deleteProject = (projectToBeDeleted) => {
        const remainingProjects = this.state.projects.filter((project) => project !== projectToBeDeleted);
        this.updateProjects(remainingProjects);
    }

    render() {
        console.log(this.state.draftOption);
        const projectCmps = this.state.projects.map(
            (project) => {
                    return <ProjectInfo key={project.id} project={project} deleteProject={this.deleteProject} draftOption={this.state.draftOption}/>
            });

        return (
            <>
                <Flex>
                    <Wrap>
                        {projectCmps}
                    </Wrap>
                    <Spacer/>
                    <AddProjectButton addProject={this.addProject}/>
                </Flex>
            </>
        );
    }
}
 
export default MrAnalysisPage;