import RepositoryMdl from "./RepositoryMdl";

class ProjectMdl {
    constructor(obj) {
        this.id=-1;
        this.repository = "";
        obj && Object.assign(this, obj);
    }
}
 
export default ProjectMdl;