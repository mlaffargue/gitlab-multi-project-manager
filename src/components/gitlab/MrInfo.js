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
            approval: null
         }
    }


    componentDidMount() {
        const pipelinesPerPipelineId = new Map();
        
        GitlabService.getMRApprovals(this.props.project, this.props.mergeRequest.iid)
            .then((approval) => {
                this.setState((prevState) => ({
                    ...prevState,
                    approval: approval
                    })
                );
            }
        );

        GitlabService.getMRPipelines(this.props.project, this.props.mergeRequest.iid)
            .then((pipelines) => {
                // keep pipelines per pipelineId in map 
                pipelines.forEach(pipeline => pipelinesPerPipelineId.set(pipeline.id,pipeline));
                
                // Update state
                this.setState((prevState) => ({
                    ...prevState,
                    pipelinesPerPipelineId: pipelinesPerPipelineId
                    })
                );
            }
        );
        
    }

    render() {
        const mergeRequest = new GitlabMrInfoMdl(this.props.mergeRequest);
        const pipelinesPerPipelineIdMap = this.state.pipelinesPerPipelineId;
       
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
                            <PipelineAccordion project={this.props.project} pipelinesPerPipelineIdMap={pipelinesPerPipelineIdMap}/>
                        </Box>
                        <Approval approval={this.state.approval} />
                    </Box>
                </Box>
        );
    }
}
 
export default MrInfo;