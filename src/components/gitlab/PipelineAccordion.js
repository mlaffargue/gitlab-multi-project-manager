import { Center } from '@chakra-ui/layout';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Icon } from '@chakra-ui/react';
import React, { Component } from 'react';
import { CgArrowsBreakeH } from 'react-icons/cg';
import GitlabPipelineMdl from '../../model/gitlab-api/GitlabPipelineMdl';
import Pipeline from './Pipeline';

class PipelineAccordion extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    createPipelinesCmps = (latestPipelineJobListCmps, othersPipelinesJobListCmps) => {
        const pipelinesPerPipelineIdMap = this.props.pipelinesPerPipelineIdMap;
        const jobsPerPipelineIdMap = this.props.jobsPerPipelineIdMap;
        
        let idx = 0;
        
        jobsPerPipelineIdMap.forEach( (jobs, pipelineId) => {
            const pipeline = new GitlabPipelineMdl(pipelinesPerPipelineIdMap.get(pipelineId));
            const currentJobListCmps = (idx === 0) ? latestPipelineJobListCmps : othersPipelinesJobListCmps;
            currentJobListCmps.push(
                <Pipeline key={pipeline.id} pipeline={pipeline} jobs={jobs.reverse()} hasSeparator={idx !== 0 && idx !== jobsPerPipelineIdMap.size-1}/>
            )
            idx++;
        });
    }

    render() {
        // Latest job component
        const latestPipelineJobListCmps = [];
        // Other jobs components
        const othersPipelinesJobListCmps = [];

        // Create pipelines components
        this.createPipelinesCmps(latestPipelineJobListCmps, othersPipelinesJobListCmps);

        // Render optional other pipelines
        const renderedOtherPipelines = (othersPipelinesJobListCmps.length > 0) ? 
                <AccordionPanel pb={4} bgColor="brand.50" >
                    {othersPipelinesJobListCmps}
                </AccordionPanel>
            : null;
        
        return (
            <Accordion allowMultiple>
                <AccordionItem border="1px solid black" mb={2}>
                    <AccordionButton>
                        <Box flex="1" textAlign="left">
                            {latestPipelineJobListCmps}
                        </Box>
                        { (othersPipelinesJobListCmps.length > 0) ? <AccordionIcon /> : null }
                    </AccordionButton>
                    {renderedOtherPipelines}
                </AccordionItem>    
            </Accordion>
        );
    }

    /*
     * created, waiting_for_resource, preparing, pending, running, success, failed, canceled, skipped, manual, scheduled
     */
    getIcon(status) {
        let icon = {
            type: "BsInfoCircle",
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

 
export default PipelineAccordion;