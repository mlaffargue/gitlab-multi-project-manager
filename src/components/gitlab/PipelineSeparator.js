import Icon from "@chakra-ui/icon";
import { Center } from "@chakra-ui/layout";
import { Component } from "react";
import { CgArrowsBreakeH } from "react-icons/cg";

class PipelineSeparator extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <Center>
                <Icon as={CgArrowsBreakeH}/><Icon as={CgArrowsBreakeH}/>
                <Icon as={CgArrowsBreakeH}/>
            </Center>
        );
    }
}
 
export default PipelineSeparator;