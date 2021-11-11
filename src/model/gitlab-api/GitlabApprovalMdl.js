import GitlabUserMdl from "./GitlabUserMdl";

class GitlabApprovalMdl {
    constructor(obj) {
        this.id="";
        this.iid=-1;
        
        this.approved=false;
        this.approved_by=[];

        obj && Object.assign(this, obj);
    }
}
 
export default GitlabApprovalMdl;