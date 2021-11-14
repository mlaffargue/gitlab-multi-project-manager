import { Gitlab } from '@gitbeaker/browser'
import GitlabProjectInfoMdl from '../../model/gitlab-api/GitlabProjectInfoMdl';
import RepositoryMdl from '../../model/RepositoryMdl';

/**
 * @param {RepositoryMdl} repository
 */
const getApi = (repositoryName) => {
    const repositories = (localStorage.getItem('repositories') && JSON.parse(localStorage.getItem('repositories')) ) || [];
    const repository = repositories.filter((repo) => repo.name === repositoryName).pop();

    return new Gitlab({
        host: repository.url,
        token: repository.token
    });
}

const GitlabService = {
    /**
     * 
     * @param {ProjectMdl} project
     * @returns {GitlabProjectInfoMdl}
     */
    getProjectInfo: function(project) {
        return getApi(project.repository).Projects.show(project.id);
    },
    /**
     * 
     * @param {ProjectMdl} project
     * @returns {GitlabProjectInfoMdl}
     */
    getMRInfoForProject: function(project) {
        return getApi(project.repository).MergeRequests.all( {
            projectId: project.id,
            state: 'opened',
            withLabelsDetails: true
        });
    },

     /**
     * 
     * @param {ProjectMdl} project
     * @param {Number} mrId
     * @returns {GitlabProjectInfoMdl}
     */
    getMRPipelines: function(project, mrId) {
        return getApi(project.repository).MergeRequests.pipelines(project.id, mrId);
    },

    /**
     * 
     * @param {ProjectMdl} project
     * @param {Number} mrId
     * @returns {}
     */
     getMRDiscussions: function(project, mrId) {
        return getApi(project.repository).MergeRequestDiscussions.all(project.id, mrId);
    },

    /**
     * 
     * @param {ProjectMdl} project
     * @param {Number} mrId
     * @returns {GitlabProjectInfoMdl}
     */
    getMRApprovals: function(project, mrId) {
        return getApi(project.repository).MergeRequestApprovals.configuration(project.id, {
            mergerequestIid: mrId
        });
    },

    /**
     * 
     * @param {ProjectMdl} project
     * @param {Number} pipelineId
     * @returns {GitlabProjectInfoMdl}
     */
    getPipelineJobs: function(project, pipelineId) {
        return getApi(project.repository).Jobs.showPipelineJobs(project.id, pipelineId);
    }
}

export default GitlabService;