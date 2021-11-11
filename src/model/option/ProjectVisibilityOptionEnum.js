const ProjectVisibilityOptionEnum = {
    HIDE_EMPTY: {text: "Hide Empty"},
    SHOW_EMPTY: {text: "Show Empty"},

    fromValue: (value) => {
        return value ? ProjectVisibilityOptionEnum.HIDE_EMPTY : ProjectVisibilityOptionEnum.SHOW_EMPTY
    }
}

export default ProjectVisibilityOptionEnum;