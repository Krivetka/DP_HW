import {ProjectGroup, Task} from "./ProjectComponent";

export class ProjectBuilder {
    private root: ProjectGroup;

    constructor(name: string) {
        this.root = new ProjectGroup(name);
    }

    addTask(name: string, time: number): ProjectBuilder {
        this.root.add(new Task(name, time));
        return this;
    }

    addGroup(name: string, configure: (builder: ProjectBuilder) => void): ProjectBuilder {
        const subBuilder = new ProjectBuilder(name);
        configure(subBuilder);
        this.root.add(subBuilder.build());
        return this;
    }

    build(): ProjectGroup {
        return this.root;
    }
}