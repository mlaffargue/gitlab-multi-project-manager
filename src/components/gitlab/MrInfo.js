import Icon from '@chakra-ui/icon';
import { Badge, Box, Center, Link, Text, Spacer,VStack } from '@chakra-ui/layout';
import { Flex } from '@chakra-ui/react';
import { Tag } from '@chakra-ui/tag';
import React, { Component } from 'react';
import { CgArrowLongRightR, CgComment } from 'react-icons/cg';
import { FiExternalLink } from 'react-icons/fi';
import GitlabApprovalMdl from '../../model/gitlab-api/GitlabApprovalMdl';
import GitlabMrInfoMdl from '../../model/gitlab-api/GitlabMrInfoMdl';
import GitlabService from '../../services/gitlab/GitlabService';
import Approval from './Approval';
import PipelineAccordion from './PipelineAccordion';

class MrInfo extends Component {   
    constructor(props) {
        super(props);
        this.state = { 
            pipelinesPerPipelineId:new Map(),
            pipelinesFetchError: false,
            approval: null,
            discussions: []
         }
    }


    componentDidMount() {
        GitlabService.getMRApprovals(this.props.project, this.props.mergeRequest.iid)
            .then((approval) => {
                this.setState((prevState) => ({
                    ...prevState,
                    approval: approval
                    })
                );
            }
        ).catch((reason) => {
            // TODO: Error on approval fetch
        });

        GitlabService.getMRDiscussions(this.props.project, this.props.mergeRequest.iid)
        .then((discussions) => {
                 this.setState((prevState) => ({
                    ...prevState,
                    discussions: discussions
                    })
                );
            }
        ).catch((reason) => {
            // TODO: Error on discussions fetch
        });

        GitlabService.getMRPipelines(this.props.project, this.props.mergeRequest.iid)
            .then((pipelines) => {
                const retrievedPipelinesMap = new Map();
                // keep pipelines per pipelineId in map 
                pipelines.forEach(pipeline => retrievedPipelinesMap.set(pipeline.id,pipeline));

                // Update state
                this.setState((prevState) => ({
                    ...prevState,
                    pipelinesPerPipelineId: new Map([...retrievedPipelinesMap].sort((a, b) => b[1] - a[1]))
                    })
                );
            }).catch((reason) => {
                this.setState((prevState) => ({
                        ...prevState,
                        pipelinesFetchError: true
                    })
                );
            });
        
    }

    render() {
        const mergeRequest = new GitlabMrInfoMdl(this.props.mergeRequest);
       
        return (
                <VStack borderRadius="md" mb={1} backgroundColor="brand.100" colorScheme="brand" width="100%">
                    <Flex p={0} m={0} width="100%">
                        <Box borderRadius="xl" p={0} m={1} fontSize="xs" bgColor="brand.200" color="brand.600" flexGrow={1} maxW="95%">
                            <Flex p={0} m={1}>
                                <Box  flexGrow={1} maxW="90%">
                                    <Text maxW="95%" whiteSpace="nowrap" title={mergeRequest.title} overflow="hidden" textOverflow="ellipsis" >{mergeRequest.title}</Text>
                                </Box>
                                <Box flexGrow={0}>
                                    <Link href={mergeRequest.web_url} isExternal fontSize="xx-small"><Icon as={FiExternalLink}/>{mergeRequest.references.short}</Link>
                                </Box>
                            </Flex>
                        </Box>
                        <Box  p={0} m={0} flexGrow={0} >
                            <Icon  as={CgComment}/>
                        </Box>
                    </Flex>
                    <Box padding={1} width="100%">
                        <Flex fontSize="xs" width="100%">
                            <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" title={mergeRequest.source_branch +" --> " +mergeRequest.target_branch}>
                                {mergeRequest.source_branch}
                                <Icon as={CgArrowLongRightR} boxSize={4}/>
                                {mergeRequest.target_branch}
                            </Text>
                        </Flex>
                        <Box>
                            { (this.state.pipelinesFetchError) ? (
                                    <Text textColor="red">Error loading pipelines</Text>
                                ) : (
                                    <PipelineAccordion project={this.props.project} pipelinesPerPipelineIdMap={this.state.pipelinesPerPipelineId}/>
                                )
                            }
                        </Box>
                        <Approval approval={this.state.approval} />
                    </Box>
                </VStack>
        );
    }
}
 
export default MrInfo;