import GitlabUserMdl from "./GitlabUserMdl";

class GitlabMrInfoMdl {
    constructor(obj) {
        this.assignee=new GitlabUserMdl();
        this.reviewers=[];
        this.id="";
        this.iid=-1;
        this.project_id="";
        this.references= {
           short:"",
           relative:"",
           full:""
        };
        this.labels=[];
        this.source_branch="";
        this.target_branch="";
        this.web_url="";
        this.draft=false;
     
        // Added
        this.lastPipeline={};
        this.approval={};

        obj && Object.assign(this, obj);
    }
}
 
export default GitlabMrInfoMdl;