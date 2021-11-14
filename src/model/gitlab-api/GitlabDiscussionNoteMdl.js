import GitlabUserMdl from "./GitlabUserMdl";

class GitlabDiscussionNoteMdl {
    constructor(obj) {
        this.id="";
        this.body="";
        this.author=new GitlabUserMdl();
        this.created_at="";
        this.updated_at="";

        obj && Object.assign(this, obj);
    }
}
 
export default GitlabDiscussionNoteMdl;

/*
[{
        "id": "30a9546c00c776b560640e2a5a980114421d1b2e",
        "individual_note": true,
        "notes": [{
                "id": 731492661,
                "type": null,
                "body": "added 1 commit\n\n\u003cul\u003e\u003cli\u003e01eef4a8 - defects fixed\u003c/li\u003e\u003c/ul\u003e\n\n[Compare with previous version](/2moro/aero-webb/modules/dassault-module/-/merge_requests/523/diffs?diff_id=277495194\u0026start_sha=209967be111b54f8162a74a2ff7452d580358c47)",
                "attachment": null,
                "author": {
                    "id": 7539129,
                    "name": "Ramesh Jaiswal",
                    "username": "ramesh.jaiswal",
                    "state": "active",
                    "avatar_url": "https://secure.gravatar.com/avatar/e730f80970a038f3a4debe0a30525042?s=80\u0026d=identicon",
                    "web_url": "https://gitlab.com/ramesh.jaiswal"
                },
                "created_at": "2021-11-12T06:42:54.829Z",
                "updated_at": "2021-11-12T06:42:54.830Z",
                "system": true,
                "noteable_id": 124982184,
                "noteable_type": "MergeRequest",
                "resolvable": false,
                "confidential": false,
                "noteable_iid": 523,
                "commands_changes": {}
            }
        ]
    }
*/