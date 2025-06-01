import {DatabaseAdapter} from "./adapters/DatabaseAdapter";
import {ApiAdapter} from "./adapters/ApiAdapter";
import {FileAdapter} from "./adapters/FileAdapter";
import {CacheAdapter} from "./adapters/CacheAdapter";

import {StatisticsVisitor} from "./visitors/StatisticsVisitor";
import {FilterVisitor} from "./visitors/FilterVisitor";

const sources = [
    new DatabaseAdapter("postgres://prod-db"),
    new ApiAdapter("https://api.hr.io/employees"),
    new FileAdapter("./data/employees.json"),
    new CacheAdapter("hr-session-001")
];

const statsVisitor = new StatisticsVisitor();
const filterVisitor = new FilterVisitor(emp => emp.salary > 50000);


for (const source of sources) {
    source.accept(statsVisitor);
    source.accept(filterVisitor);
}

