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
            latestPipeline: null,
            otherPipelines: []
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.pipelinesPerPipelineIdMap !== this.props.pipelinesPerPipelineIdMap) {
            // Set latest pipeline
            const mapIter = this.props.pipelinesPerPipelineIdMap.values();

            const latestPipeline = mapIter.next().value;       
            const otherPipelines = [];

            let otherPipelineIterator = mapIter.next();
            while (!otherPipelineIterator.done) {
                otherPipelines.push(otherPipelineIterator.value);
                otherPipelineIterator = mapIter.next();
            }

            this.setState((prevState) => ({
                    ...prevState,
                    latestPipeline: latestPipeline,
                    otherPipelines: otherPipelines
                })
            );
        }
      }

    getPipelineComponent = (pipelines) => {
        if (! Array.isArray(pipelines)) {
            pipelines = [pipelines];
        }

        const pipelineCmps = []  ;
        let idx = 0;

        pipelines
            .forEach( (pipeline) => {
                // No separator after first and last
                const hasSeparator = (idx !== 0 && idx !== this.props.pipelinesPerPipelineIdMap.size-1)

                pipelineCmps.push(
                    <Pipeline key={pipeline.id} pipeline={pipeline} project={this.props.project} hasSeparator={hasSeparator}/>
                )
                idx++;
            });

        return pipelineCmps;
    }

    render() {
        if (! this.state.latestPipeline) {
            return null;
        }
        
        return (
            <Accordion allowMultiple>
                <AccordionItem border="1px solid black" mb={2}>
                {({ isExpanded }) => (
                    <>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                {this.getPipelineComponent(this.state.latestPipeline)}
                            </Box>
                            { (this.state.otherPipelines.length > 0) ? <AccordionIcon /> : null }
                        </AccordionButton>
                        { isExpanded ? (
                            <AccordionPanel pb={4} bgColor="brand.50" >
                                {this.getPipelineComponent(this.state.otherPipelines)}
                            </AccordionPanel>
                            ) : (null)
                        }
                    </>
                )}
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