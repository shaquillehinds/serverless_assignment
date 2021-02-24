const request = require("supertest");
const { tasks } = require("./fixtures/seed");

const defaultURL = "https://91q44o0yh9.execute-api.us-east-1.amazonaws.com/default";

const testTask = tasks[Math.floor(Math.random() * 30)];

test("Shoud create a new task.", async (done) => {
  const { body } = await request(defaultURL).post("/task").set("Content-Type", "application/json").send(testTask).expect(201);

  console.log(body);
  expect(body).not.toBeNull();
  expect(body.Title).toBe(testTask.Title);
  expect(body.Completed).toBe(false);
  done();
});

test("Should get all tasks.", async (done) => {
  const { body } = await request(defaultURL).get("/task").set("Content-Type", "application/json").send().expect(200);

  expect(body).not.toBeNull();
  expect(body.length > 0).toBe(true);
  done();
});

test("Should get a task by its title.", async (done) => {
  const { body } = await request(defaultURL).get(`/task/${testTask.Title}`).set("Content-Type", "application/json").send().expect(200);

  expect(body.Title).toBe(testTask.Title);
  done();
});

test("Shoud update a task.", async (done) => {
  const { body } = await request(defaultURL)
    .patch(`/task/${testTask.Title}`)
    .set("Content-Type", "application/json")
    .send({ Completed: true })
    .expect(202);

  expect(body.Completed).toBe(true);
  done();
});

test("Should delete a task", async (done) => {
  const { body } = await request(defaultURL).delete(`/task/${testTask.Title}`).set("Content-Type", "application/json").send().expect(200);

  expect(body).not.toBeNull();
  expect(body.Title).toBe(testTask.Title);
  done();
});
