class GitlabPipelineMdl {
    constructor(obj) {
        this.id=-1;
        this.project_id=-1;
        this.updated_at="";
        this.status="";
        this.web_url="";
        obj && Object.assign(this, obj);
    }
}
 
export default GitlabPipelineMdl;