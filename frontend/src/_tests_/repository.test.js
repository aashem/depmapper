import jsonServices from '../services/jsonServices'


describe('Mongo DB stress test', () => {
    it("How fast does mongo handle 100 insert queries", async () => {
        let graph = {
            json: "request test",
            name: "request test"
        }
        let initMins = new Date().getMinutes()
        let initSecs = new Date().getSeconds()
        initMins = initMins * 100
        let initTime = initMins + initSecs
        let res = await jsonServices.create(graph)
        let endMins = new Date().getMinutes()
        let endSecs = new Date().getSeconds() 
        endMins = endMins * 100
        let endTime = endMins + endSecs
        let diff = endTime - initTime
        console.log(diff, initTime, endTime)
        expect(res.name).toBe(graph.name)
    })
})