import { Box, HStack } from '@chakra-ui/layout';
import React, { Component } from 'react';
import GitlabPipelineMdl from '../../model/gitlab-api/GitlabPipelineMdl';
import JobList from './JobList';
import PipelineSeparator from './PipelineSeparator';

class Pipeline extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() {
        const pipeline = new GitlabPipelineMdl(this.props.pipeline);
        const idx = this.props.idx;
        const jobs = this.props.jobs;

        const separator = this.props.hasSeparator ? <PipelineSeparator/> : null;

        return ( 
            <Box key={pipeline.id}>
                <HStack fontSize="xs">
                    <Box fontSize="smaller">
                        {new Date(pipeline.updated_at).toLocaleString()}
                    </Box>
                    <JobList jobs={jobs}/>
                </HStack>
                {separator}
            </Box>
         );
    }
}
 
export default Pipeline;