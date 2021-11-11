import { Center } from '@chakra-ui/layout';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Icon } from '@chakra-ui/react';
import React, { Component } from 'react';
import { CgArrowsBreakeH } from 'react-icons/cg';
import GitlabPipelineMdl from '../../model/gitlab-api/GitlabPipelineMdl';
import Pipeline from './Pipeline';

class PipelineAccordion extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            pipelinesPerPipelineIdMap: props.pipelinesPerPipelineIdMap,
         }
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            ...prevState,
            pipelinesPerPipelineIdMap: nextProps.pipelinesPerPipelineIdMap
        };
    }

    createPipelinesCmps = (latestPipeline, otherPipelines) => {      
        let idx = 0;
        
        new Map([...this.state.pipelinesPerPipelineIdMap].sort((a, b) => b[1] - a[1]))
            .forEach( (pipeline) => {
            const currentJobListCmps = (idx === 0) ? latestPipeline : otherPipelines;
            // No separator after first and last
            const hasSeparator = (idx !== 0 && idx !== this.state.pipelinesPerPipelineIdMap.size-1)

            currentJobListCmps.push(
                <Pipeline key={pipeline.id} pipeline={pipeline} project={this.props.project} hasSeparator={hasSeparator}/>
            )
            idx++;
        });
    }

    render() {
        // Latest job component
        const latestPipeline = [];
        // Other jobs components
        const otherPipelines = [];

        // Create pipelines components
        this.createPipelinesCmps(latestPipeline, otherPipelines);

        // Render optional other pipelines
        const renderedOtherPipelines = (otherPipelines.length > 0) ? 
                <AccordionPanel pb={4} bgColor="brand.50" >
                    {otherPipelines}
                </AccordionPanel>
            : null;
        
        return (
            <Accordion allowMultiple>
                <AccordionItem border="1px solid black" mb={2}>
                    <AccordionButton>
                        <Box flex="1" textAlign="left">
                            {latestPipeline}
                        </Box>
                        { (otherPipelines.length > 0) ? <AccordionIcon /> : null }
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