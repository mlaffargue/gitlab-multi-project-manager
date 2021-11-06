const DraftOptionEnum = {
    NORMAL: {text: "Non draft"},
    DRAFT_ONLY: {text: "Draft only"},
    BOTH: {text: "All"},

    fromIdx: (idx) => {
        switch (idx) {
            case 0:
                return DraftOptionEnum.NORMAL;
            case 1:
                return DraftOptionEnum.BOTH;
            case 2:
                return DraftOptionEnum.DRAFT_ONLY;
        
            default:
                return DraftOptionEnum.NORMAL;
        }
    }
}

export default DraftOptionEnum;