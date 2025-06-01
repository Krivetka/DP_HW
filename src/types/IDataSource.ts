import {IDataVisitor} from "./IDataVisitor";

export interface IDataSource {
    fetchRecords(): Promise<EmployeeRecord[]>;
    accept(visitor: IDataVisitor): void;
}

export interface EmployeeRecord {
    id: string | number;
    name: string;
    salary: number;

    [extra: string]: any;
}