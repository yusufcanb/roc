export interface FileTree {
    id: number;
    name: "Resources";
    type: "directory";
    children: Array<FileTree>;
}

export interface Project {
    id: string | number;
    name: string;
    files: Array<FileTree>
}

export class ProjectModel {
    //@ts-ignore
    private _object: Project;

    get id() {
        return this._object.id;
    }

    get files() {
        this._object.files.map(file => (file.type.toLowerCase()));
        return this._object.files;
    }

    get name() {
        return this._object.name
    }
}
