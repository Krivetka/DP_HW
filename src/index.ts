import { ProjectBuilder } from "./ProjectBuilder";
import { ProjectGroup, Task} from "./ProjectComponent";
import {ProjectIterator} from "./Iterator";

const builder = new ProjectBuilder("Website Launch");
const project = builder
    .addTask("Design UI", 5)
    .addTask("Setup Backend", 8)
    .addGroup("Marketing", b => b
        .addTask("Write blog post", 2)
        .addTask("Create promo video", 3)
    )
    .build();

const iterator = new ProjectIterator(project);
while (iterator.hasNext()) {
    const { component, depth } = iterator.next()!;
    const prefix = " ".repeat(depth * 2);
    if (component instanceof ProjectGroup) {
        console.log(`${prefix}📦 ${component.getName()} (Group) - ${component.getTimeEstimate()}h`);
    } else if (component instanceof Task) {
        console.log(`${prefix}📝 ${component.getName()} - ${component.getTimeEstimate()}h`);
    }
}