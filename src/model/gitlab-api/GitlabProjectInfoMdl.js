class GitlabProjectInfoMdl {
    constructor(obj) {
        this.id=-1;
        this.name="";
        this.name_with_namespace="";
        this.path_with_namespace="";
        this.ssh_url_to_repo="";
        this.web_url="";

        obj && Object.assign(this, obj);
    }
}
 
export default GitlabProjectInfoMdl;