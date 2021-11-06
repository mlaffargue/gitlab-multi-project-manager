import GitlabPipelineMdl from "./GitlabPipelineMdl";
import GitlabUserMdl from "./GitlabUserMdl";

class GitlabJobMdl {
    constructor(obj) {
        this.id=-1;
        this.pipeline=new GitlabPipelineMdl();
        this.name="";
        this.status="";
        this.user=new GitlabUserMdl();
        this.web_url="";
        obj && Object.assign(this, obj);
    }
}
 
export default GitlabJobMdl;