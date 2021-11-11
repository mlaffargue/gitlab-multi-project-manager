import React, { Component } from 'react';
import { Menu, MenuButton, MenuList, MenuItem, Box, IconButton } from '@chakra-ui/react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { GoSettings } from 'react-icons/go'
import { Link } from 'react-router-dom';
import { AddIcon } from '@chakra-ui/icons';
import GmpmSettings from '../../pages/Settings';

class GmpmMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <Box textAlign='center'>
                <Menu>
                    <MenuButton 
                        textColor="white"
                        mt={5} 
                        as={IconButton} 
                        icon={<GiHamburgerMenu />} 
                        variant="outline"/>
                    <MenuList>
                            <GmpmSettings/>
                    </MenuList>
                </Menu>
            </Box>);
    }
}
 
export default GmpmMenu;