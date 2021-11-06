class RepositoryMdl {
    constructor(obj) {
        this.name="";
        this.token="";
        this.url="";
        obj && Object.assign(this, obj);
    }
}
 
export default RepositoryMdl;