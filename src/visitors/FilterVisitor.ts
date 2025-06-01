import { IDataVisitor } from "../types/IDataVisitor";
import { EmployeeRecord } from "../types/IDataSource";
import { DatabaseAdapter } from "../adapters/DatabaseAdapter";
import { ApiAdapter } from "../adapters/ApiAdapter";
import { FileAdapter } from "../adapters/FileAdapter";
import { CacheAdapter } from "../adapters/CacheAdapter";

export class FilterVisitor implements IDataVisitor {
    constructor(private predicate: (item: EmployeeRecord) => boolean) {}

    async process(source: { fetchRecords(): Promise<EmployeeRecord[]> }, label: string) {
        const data = await source.fetchRecords();
        const filtered = data.filter(this.predicate);
        console.log(`[Filter][${label}] matched ${filtered.length} employees`, filtered);
    }

    visitDatabase(adapter: DatabaseAdapter): void {
        this.process(adapter, "Database").catch(console.error);
    }
    visitApi(adapter: ApiAdapter): void {
        this.process(adapter, "API").catch(console.error);
    }
    visitFile(adapter: FileAdapter): void {
        this.process(adapter, "File").catch(console.error);
    }
    visitCache(adapter: CacheAdapter): void {
        this.process(adapter, "Cache").catch(console.error);
    }
}