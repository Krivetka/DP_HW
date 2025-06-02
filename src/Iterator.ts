import {ProjectComponent, ProjectGroup} from "./ProjectComponent";

interface Iterator<T> {
    next(): T | null;
    hasNext(): boolean;
}

export class ProjectIterator implements Iterator<{ component: ProjectComponent; depth: number }> {
    private stack: { component: ProjectComponent; depth: number }[] = [];

    constructor(root: ProjectComponent) {
        this.stack.push({ component: root, depth: 0 });
    }

    next(): { component: ProjectComponent; depth: number } | null {
        if (!this.hasNext()) return null;

        const current = this.stack.pop()!;
        if (current.component instanceof ProjectGroup) {
            const children = [...current.component.getComponents()].reverse();
            for (const child of children) {
                this.stack.push({ component: child, depth: current.depth + 1 });
            }
        }
        return current;
    }

    hasNext(): boolean {
        return this.stack.length > 0;
    }
}
