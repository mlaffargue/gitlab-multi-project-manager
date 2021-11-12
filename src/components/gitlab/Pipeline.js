import { Box, HStack } from '@chakra-ui/layout';
import React, { Component } from 'react';
import GitlabPipelineMdl from '../../model/gitlab-api/GitlabPipelineMdl';
import GitlabService from '../../services/gitlab/GitlabService';
import Job from './Job';
import PipelineSeparator from './PipelineSeparator';

class Pipeline extends Component {
    constructor(props) {
        super(props);

        this.state = { jobs: [] }

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
        ).catch(error => {});
    }

    render() {
        const pipeline = new GitlabPipelineMdl(this.props.pipeline);
        const jobsComponent = this.state.jobs.map((job) => <Job job={job} />);

        const separator = this.props.hasSeparator ? <PipelineSeparator/> : null;

        return ( 
            <Box key={pipeline.id}>
                <HStack fontSize="xs">
                    <Box fontSize="smaller">
                        {new Date(pipeline.updated_at).toLocaleString()}
                    </Box>
                    <HStack spacing="0px">
                        {jobsComponent}
                    </HStack>
                </HStack>
                {separator}
            </Box>
         );
    }
}
 
export default Pipeline;