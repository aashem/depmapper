import jsonServices from '../services/jsonServices'
import testGraphJson from './testgraph.json'


  describe('POST request', () => {
    it("should POST graph to db with name 'test'", async () => {
      let graph = {
        json: 'this is test json1',
        name: 'test'
      }
      let res = await jsonServices.create(graph)
      expect(res.name).toBe(graph.name)
    })
  })
  describe('DELETE request', () => {
    it('should GET graph by name "test" and DELETE it', async () => {
      let res = await jsonServices.getByName('test')
      res = await jsonServices.remove(res[0].id)
      expect(res.name).toBe('test')
    })
  })
  describe('Graphical Presentation', () => {
    it('should POST graph named testGraph where there are 3 node and all are connected with different colours (View the graph in localhost:3000)', async () => {
      let graph = {
        json: testGraphJson,
        name: 'testGraph'
      }
      let alreadyInDb = await jsonServices.getByName('testGraph')
      if (alreadyInDb[0]){
        let res = await jsonServices.update(alreadyInDb[0].id, graph)
        expect(res.name).toBe('testGraph')
      }else{
        let  res = await jsonServices.create(graph)
        expect(res.name).toBe('testGraph')
      }
    })
  })
  




