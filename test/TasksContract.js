const TasksContract = artifacts.require("TasksContract");

contract("TasksContract", () => {
    before(async () => {
        this.tasksContract = await TasksContract.deployed();
    });

    it("migrate deployed succesfully", async () => {
        const address = this.tasksContract.address;

        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, "");
    });

    it("get Tasks List", async () => {
        const tasksCounter = await this.tasksContract.taskCounter();
        const task = await this.tasksContract.tasks(tasksCounter);

        assert.equal(task.id.toNumber(), tasksCounter);
        assert.equal(task.done, false);
    });

    it("task created succesfully", async () => {
        const result = await this.tasksContract.createTask(
            "alguna tarea",
            "alguna description"
        );

        const taskEvent = result.logs[0].args;
        const tasksCounter = await this.tasksContract.taskCounter();

        assert.equal(tasksCounter, 2);
        assert.equal(taskEvent.id.toNumber(), 2);
        assert.equal(taskEvent.title, "alguna tarea");
        assert.equal(taskEvent.description, "alguna description");
        assert.equal(taskEvent.done, false);
    });

    it("task toggle done", async () => {
        const result = await this.tasksContract.toggleDone(1);

        const taskEvent = result.logs[0].args;

        const task = await this.tasksContract.tasks(1);

        assert.equal(task.done, true);
        assert.equal(taskEvent.done, true);
        assert.equal(taskEvent.id, 1);
    });
});
