//Tests via Jest - https://github.com/pavanbelagatti/notes-app-cicd/blob/main/test/test.js
// https://www.youtube.com/watch?v=89Pl2Uok8xc&t=13s&ab_channel=SamMeech-Ward - Different syntax to my project, but same

const request = require('supertest')
const app = require('./server');

describe("POST Method", () => {
    describe("Database Logging", () => {
        //Should save example record to database
        test("Should respond with a 302 status code", async () => {
            const response = await request(app).post("/").send({
            })
            expect(response.statusCode).toBe(302)
        })
    })
})

describe("GET Method", () => {
    describe("Homepage Renders", () => {
        test("Should render the homepage", async() => {
            const display = await request(app).get("/").expect(200)
        })
    })
    describe("About Page Render", () => {
        test("Should render the About Page", async() => {
            const display = await request(app).get("/about.html").expect(200)
        })
    })
    describe("Privacy Page Render", () => {
        test("Should render the Privacy Page", async() => {
            const display = await request(app).get("/privacy.html").expect(200)
        })
    })

})

