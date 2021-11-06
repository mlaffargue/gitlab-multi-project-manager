import { Box, HStack, Icon } from '@chakra-ui/react';
import React, { Component } from 'react';
import GitlabJobMdl from '../../model/gitlab-api/GitlabJobMdl';
import IconMap from '../IconMap';

class JobList extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    buildJobsComponents = (jobs) => {
        // Transform jobs to GUI components
        return jobs.map(job => {
            const jobMdl = new GitlabJobMdl(job);
            const icon = this.getIcon(jobMdl.status);
            return (
                <Box key={jobMdl.id}>
                    <Icon as={IconMap.toIcon(icon.type)} 
                            color={icon.color} 
                            boxSize={5} 
                            title={jobMdl.name + " " + jobMdl.status}/>
                </Box>);
            }
        );
    }

    render() {
        const jobsComponent = this.buildJobsComponents(this.props.jobs);

        // Show them horizontally
        return (
        <HStack spacing="0px">
            {jobsComponent}
        </HStack> );
    }

    /*
     * Transform gitlab job status to the appropriate icon
     */
    getIcon(status) {
        let icon = {
            type: "BiInfoCircle",
            color: "black"
        };
        
        switch (status) {
            case "failed":
                icon.type = "BiXCircle";
                icon.color = "red";
                break;
            case "running":
                icon.type = "BiPlayCircle";
                break;
            case "success":
                icon.type = "BiCheckCircle";
                icon.color = "green";
                break;
            case "canceled":
                icon.type = "BiMinusCircle";
                break;
            case "skipped":
                icon.type = "BiFastForwardCircle";
                break;
            case "manual":
                icon.type = "BiUserCircle";
                break;
        }

        return icon;
    }
}

 
export default JobList;