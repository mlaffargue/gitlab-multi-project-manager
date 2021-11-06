import Icon from '@chakra-ui/icon';
import { Badge, Box, Center, Link, Text } from '@chakra-ui/layout';
import { Flex } from '@chakra-ui/react';
import { Tag } from '@chakra-ui/tag';
import React, { Component } from 'react';
import { CgArrowLongRightR } from 'react-icons/cg';
import { FiExternalLink } from 'react-icons/fi';
import GitlabService from '../../services/gitlab/GitlabService';
import PipelineAccordion from './PipelineAccordion';

class MrInfo extends Component {   
    constructor(props) {
        super(props);
        this.state = { 
            jobsPerPipelineId:new Map(),
            pipelinesPerPipelineId:new Map()
         }
    }

    getPipelinesJobs = (pipelines) => {
        return Promise.all(
            pipelines.map(pipeline => GitlabService.getPipelineJobs(this.props.project, pipeline.id))
        )
    }

    componentDidMount() {
        const pipelinesPerPipelineId = new Map();
        const jobsPerPipelineId = new Map();
        GitlabService.getMRPipelines(this.props.project, this.props.mergeRequest.iid)
            .then((pipelines) => {
                pipelines
                    // keep pipelines per pipelineId in map 
                    .forEach(pipeline => pipelinesPerPipelineId.set(pipeline.id,pipeline));
                
                // Get pipelines jobs
                this.getPipelinesJobs(pipelines)
                    .then (
                        (pipelineJobs) => {
                            // keep jobs per pipelineId in map 
                            pipelineJobs
                                .forEach((jobs) => {
                                if (jobs.length > 0) {
                                    jobsPerPipelineId.set(jobs[0].pipeline.id, jobs.reverse());
                                }
                            });
            
                            // Update state
                            this.setState({
                                pipelinesPerPipelineId: pipelinesPerPipelineId,
                                jobsPerPipelineId: jobsPerPipelineId
                            });
                        }
                    );
            }
        );
        
    }

    render() {
        const mergeRequest = this.props.mergeRequest;
        const jobsPerPipelineIdMap = this.state.jobsPerPipelineId;
        const pipelinesPerPipelineIdMap = this.state.pipelinesPerPipelineId;
        
        return (
                <Badge borderRadius="md" mb="2" px="2" colorScheme="brand" w="100%" minW="min-content">
                    <Box w="25vw" minW="25vw">
                        <Center>
                            <Tag width="100%" fontSize="x-small" bgColor="brand.200" color="brand.600">
                                <Text width="90%" title={mergeRequest.title} overflow="hidden" textOverflow="ellipsis" >{mergeRequest.title}</Text>
                                <Link href={mergeRequest.web_url} isExternal><Icon as={FiExternalLink} ml={4}/>{mergeRequest.references.short}</Link>
                            </Tag>
                        </Center>
                    </Box>
                    <Box w="25vw" minW="25vw">
                        <Flex fontSize="x-small" width="100%">
                            <Text overflow="hidden" textOverflow="ellipsis" title={mergeRequest.source_branch +" --> " +mergeRequest.target_branch}>
                                {mergeRequest.source_branch}
                                <Icon as={CgArrowLongRightR} boxSize={4}/>
                                {mergeRequest.target_branch}
                            </Text>
                        </Flex>
                        <Box>
                            <PipelineAccordion pipelinesPerPipelineIdMap={pipelinesPerPipelineIdMap} jobsPerPipelineIdMap={jobsPerPipelineIdMap}/>
                        </Box>
                    </Box>
                </Badge>
        );
    }
}
 
export default MrInfo;