import { Button, IconButton } from '@chakra-ui/button';
import Icon from '@chakra-ui/icon';
import { Badge, Box, Center, Flex, SimpleGrid, VStack, Text } from '@chakra-ui/layout';
import React, { Component } from 'react';
import { CgBitbucket, CgTrashEmpty } from 'react-icons/cg';
import DraftOptionEnum from '../../model/option/DraftOptionEnum';
import GitlabProjectInfoMdl from '../../model/gitlab-api/GitlabProjectInfoMdl';
import GitlabService from '../../services/gitlab/GitlabService';
import MrInfo from './MrInfo';
import ProjectVisibilityOptionEnum from '../../model/option/ProjectVisibilityOptionEnum';

class ProjectInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projectInfo: new GitlabProjectInfoMdl({}),
            mergeRequests: [],
            displayed: true
        };
    }

    componentDidMount() {
        // Get project information
        GitlabService.getProjectInfo(this.props.project).then(
            (projectInfo) => {
                this.setState((prevState) => ({
                    ...prevState,
                    projectInfo: new GitlabProjectInfoMdl(projectInfo)
                })
            );
        });

        // Get project Merge requests
        GitlabService.getMRInfoForProject(this.props.project).then(
            (mrList) => {
                this.setState((prevState) => ({
                    ...prevState,
                    mergeRequests: mrList
                    })
                );
        });
    }

    deleteProject = () => {
        this.props.deleteProject(this.props.project);
    }

    render() {
        const mrComponents = this.state.mergeRequests.map(mr => {
            // Show/Hide depending on mode and draft value
            if ((this.props.draftOption === DraftOptionEnum.NON_DRAFT && mr.draft) 
                || (this.props.draftOption === DraftOptionEnum.DRAFT_ONLY && !mr.draft)) {
                return null;
            }
            return <MrInfo key={mr.id} project={this.props.project} mergeRequest={mr}></MrInfo>
            }
        ).filter((element) => element !== null);

        if (this.props.projectVisibilityOption === ProjectVisibilityOptionEnum.HIDE_EMPTY
            && mrComponents.length === 0) {
            return null;
        }

        return (
            <VStack maxW="20vw" width="20vw" borderWidth="1px" borderRadius="lg" bgColor="brand.600" >
                <SimpleGrid columns={3} w="100%">
                    <Box> </Box>
                    <Box>
                        <Center>
                            <Badge textAlign="center" borderRadius="lg" px="2" colorScheme="yellow" variant="outline">
                                <Text fontSize="xs" >{this.state.projectInfo.name}<br />{this.props.project.repository}</Text>
                            </Badge>
                        </Center>
                    </Box>
                    <Box textAlign="right">
                        <IconButton icon={<CgTrashEmpty/>} 
                            cursor="pointer"
                            title="Delete project" 
                            size="xs" 
                            mr={4}
                            colorScheme="brand"
                            onClick={this.deleteProject}/>
                    </Box>
                </SimpleGrid>
                <Box p="3" w="100%">
                    {mrComponents}
                </Box>
           </VStack>
        );
    }
}
 
export default ProjectInfo;