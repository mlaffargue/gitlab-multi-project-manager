import { Component } from "react";
import { Badge, Box, Center, Link, Text } from '@chakra-ui/layout';
import { GiStamper } from 'react-icons/gi';
import GitlabApprovalMdl from "../../model/gitlab-api/GitlabApprovalMdl";
import Icon from '@chakra-ui/icon';

class Approval extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() {
        const approval = new GitlabApprovalMdl(this.props.approval);
        if (! approval?.approved_by.length > 0) {
            return null;
        }
        
        return (    
            <>
                 <Badge colorScheme="green" fontSize="x-small" borderRadius="full"><Icon color="brand.700" mr={1} as={GiStamper} boxSize={4} borderRadius="full" bgColor="green.200"/>Approved by {this.props.approval.approved_by.map((approvedBy) => approvedBy.user.name).join(',')}</Badge>
            </>      
        );
    }
}
 
export default Approval;