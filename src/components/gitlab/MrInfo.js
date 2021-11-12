import Icon from '@chakra-ui/icon';
import { Badge, Box, Center, Link, Text } from '@chakra-ui/layout';
import { Flex } from '@chakra-ui/react';
import { Tag } from '@chakra-ui/tag';
import React, { Component } from 'react';
import { CgArrowLongRightR } from 'react-icons/cg';
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
            approval: null
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
                <Box borderRadius="md" mb={1} backgroundColor="brand.100" colorScheme="brand">
                    <Box padding={1}>
                            <Tag width="100%" fontSize="xs" bgColor="brand.200" color="brand.600">
                                <Text width="75%" whiteSpace="nowrap" title={mergeRequest.title} overflow="hidden" textOverflow="ellipsis" >{mergeRequest.title}</Text>
                                <Link href={mergeRequest.web_url} isExternal><Icon as={FiExternalLink} ml={4}/>{mergeRequest.references.short}</Link>
                            </Tag>
                    </Box>
                    <Box  padding={1}>
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
                </Box>
        );
    }
}
 
export default MrInfo;