import {IDataSource, EmployeeRecord} from "../types/IDataSource";
import {IDataVisitor} from "../types/IDataVisitor";

export class FileAdapter implements IDataSource {
    constructor(private filePath: string) {
    }

    async fetchRecords(): Promise<EmployeeRecord[]> {
        return [
            {id: "f1", name: "Eve", salary: 50000, lastLogin: "2025-05-01"},
            {id: "f2", name: "Frank", salary: 47000},
        ];
    }

    accept(visitor: IDataVisitor): void {
        visitor.visitFile(this);
    }
}