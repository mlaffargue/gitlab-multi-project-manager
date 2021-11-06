import React from 'react';
import {BsInfoCircle} from 'react-icons/bs';
import {BiPlayCircle, BiXCircle, BiErrorCircle, BiCheckCircle, BiUserCircle, BiMinusCircle, BiFastForwardCircle} from 'react-icons/bi';

const IconMap = {
    toIcon(stringValue) {
        let icon; 

        switch (stringValue) {
            case "BsInfoCircle":
                icon = BsInfoCircle;
                break;
            case "BiPlayCircle":
                icon = BiPlayCircle;
                break;
            case "BiErrorCircle":
                icon = BiErrorCircle;
                break;
            case "BiCheckCircle":
                icon = BiCheckCircle;
                break;
            case "BiMinusCircle":
                icon = BiMinusCircle;
                break;
            case "BiFastForwardCircle":
                icon = BiFastForwardCircle;
                break;
            case "BiUserCircle":
                icon = BiUserCircle;
                break;
            case "BiXCircle":
                icon = BiXCircle;
                break;
            
        }

        return icon;
    }
}

export default IconMap;