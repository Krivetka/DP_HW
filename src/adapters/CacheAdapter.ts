import {IDataSource, EmployeeRecord} from "../types/IDataSource";
import {IDataVisitor} from "../types/IDataVisitor";

export class CacheAdapter implements IDataSource {
    constructor(private cacheKey: string) {
    }

    async fetchRecords(): Promise<EmployeeRecord[]> {
        return [
            {id: "c1", name: "Grace", salary: 54000, isValid: true},
            {id: "c2", name: "Henry", salary: 59000},
        ];
    }

    accept(visitor: IDataVisitor): void {
        visitor.visitCache(this);
    }
}