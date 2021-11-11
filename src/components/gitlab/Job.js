import { Box, HStack, Icon } from '@chakra-ui/react';
import React, { Component } from 'react';
import GitlabJobMdl from '../../model/gitlab-api/GitlabJobMdl';
import IconMap from '../IconMap';

class Job extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() {
        const jobMdl = new GitlabJobMdl(this.props.job);
        const icon = this.getIcon(jobMdl.status);

        // Show them horizontally
        return (
            <Box key={jobMdl.id}>
                <Icon as={IconMap.toIcon(icon.type)} 
                        color={icon.color} 
                        boxSize={5} 
                        title={jobMdl.name + " " + jobMdl.status}/>
            </Box>
        );
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

 
export default Job;