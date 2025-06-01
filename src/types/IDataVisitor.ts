import {CacheAdapter} from "../adapters/CacheAdapter";
import {DatabaseAdapter} from "../adapters/DatabaseAdapter";
import {ApiAdapter} from "../adapters/ApiAdapter";
import {FileAdapter} from "../adapters/FileAdapter";

export interface IDataVisitor {
    visitDatabase(adapter: DatabaseAdapter): void;
    visitApi(adapter: ApiAdapter): void;
    visitFile(adapter: FileAdapter): void;
    visitCache(adapter: CacheAdapter): void;
}