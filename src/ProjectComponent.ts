export interface ProjectComponent {
    getName(): string;
    getTimeEstimate(): number;
    add?(component: ProjectComponent): void;
    remove?(component: ProjectComponent): void;
}

export class Task implements ProjectComponent {
    constructor(private name: string, private time: number) {}
    getName() { return this.name; }
    getTimeEstimate() { return this.time; }
}

export class ProjectGroup implements ProjectComponent {
    private components: ProjectComponent[] = [];
    constructor(private name: string) {}

    getName() { return this.name; }
    getTimeEstimate() {
        return this.components.reduce((sum, c) => sum + c.getTimeEstimate(), 0);
    }
    add(component: ProjectComponent) {
        this.components.push(component);
    }
    remove(component: ProjectComponent) {
        this.components = this.components.filter(c => c !== component);
    }
    getComponents() {
        return this.components;
    }
}