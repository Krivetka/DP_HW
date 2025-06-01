import {IDataSource, EmployeeRecord} from "../types/IDataSource";
import {IDataVisitor} from "../types/IDataVisitor";

export class ApiAdapter implements IDataSource {
    constructor(private endpoint: string) {
    }

    async fetchRecords(): Promise<EmployeeRecord[]> {
        return [
            {id: "x1", name: "Carlos", salary: 71000, status: "active"},
            {id: "x2", name: "Diana", salary: 48000},
        ];
    }

    accept(visitor: IDataVisitor): void {
        visitor.visitApi(this);
    }
}