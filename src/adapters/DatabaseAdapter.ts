import {IDataSource, EmployeeRecord} from "../types/IDataSource";
import {IDataVisitor} from "../types/IDataVisitor";

export class DatabaseAdapter implements IDataSource {
    constructor(private connectionString: string) {
    }

    async fetchRecords(): Promise<EmployeeRecord[]> {
        return [
            {id: 1, name: "Alice", salary: 52000, department: "Sales"},
            {id: 2, name: "Bob", salary: 63000},
        ];
    }

    accept(visitor: IDataVisitor): void {
        visitor.visitDatabase(this);
    }
}