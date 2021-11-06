class GitlabUserMdl {
    constructor(obj) {
        this.name="";
        this.username="";
        this.avatar_url="";
        obj && Object.assign(this, obj);
    }
}
 
export default GitlabUserMdl;