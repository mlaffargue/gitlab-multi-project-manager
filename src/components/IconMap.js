import React from 'react';
import {BiPlayCircle, BiInfoCircle, BiXCircle, BiErrorCircle, BiCheckCircle, BiUserCircle, BiMinusCircle, BiFastForwardCircle} from 'react-icons/bi';

const IconMap = {
    toIcon(stringValue) {
        let icon; 

        switch (stringValue) {
            case "BiInfoCircle":
                icon = BiInfoCircle;
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