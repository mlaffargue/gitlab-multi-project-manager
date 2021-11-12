import { Box, HStack,Text } from '@chakra-ui/layout';
import React, { Component } from 'react';
import GitlabPipelineMdl from '../../model/gitlab-api/GitlabPipelineMdl';
import GitlabService from '../../services/gitlab/GitlabService';
import Job from './Job';
import PipelineSeparator from './PipelineSeparator';

class Pipeline extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            jobs: [],
            jobsFetchError: false
        };

    }

    componentDidMount() {
        // Get pipelines jobs
        GitlabService.getPipelineJobs(this.props.project, this.props.pipeline.id).then(
            (pipelineJobs) => {
                // Update state
                this.setState({
                    jobs: pipelineJobs.reverse()
                });
            }
        ).catch((reason) => {
            this.setState((prevState) => ({
                    ...prevState,
                    jobsFetchError: true
                })
            );
        });
    }

    render() {
        const pipeline = new GitlabPipelineMdl(this.props.pipeline);
        const jobsComponent = this.state.jobs.map((job) => <Job key={job.id} job={job} />);

        const separator = this.props.hasSeparator ? <PipelineSeparator/> : null;

        return ( 
            <Box key={pipeline.id}>
                <HStack fontSize="xs">
                    <Box fontSize="smaller">
                        {new Date(pipeline.updated_at).toLocaleString()}
                    </Box>
                    <HStack spacing="0px">
                        {
                            this.state.jobsFetchError ? (
                                <Text fontSize="xs" textColor="red">No job information</Text>
                            ) : (
                                jobsComponent
                            )
                        }
                    </HStack>
                </HStack>
                {separator}
            </Box>
         );
    }
}
 
export default Pipeline;