
class GitlabDiscussionMdl {
    constructor(obj) {
        this.id="";

        this.notes=[]; // GitlabDiscussionNoteMdl

        obj && Object.assign(this, obj);
    }
}
 
export default GitlabDiscussionMdl;