const DraftOptionEnum = {
    NON_DRAFT: {text: "Non draft"},
    DRAFT_ONLY: {text: "Draft only"},

    fromValue: (value) => {
        return value ? DraftOptionEnum.DRAFT_ONLY : DraftOptionEnum.NON_DRAFT
    }
}

export default DraftOptionEnum;