import jsonServices from '../services/jsonServices'


  describe('POST request', () => {
    it('should send POST request', async () => {
      let graph = {
        json: 'this is test json1',
        name: 'test'
      }
      let res = await jsonServices.create(graph)
      expect(res.name).toBe(graph.name)
    })
  })
  describe('DELETE request', () => {
    it('should get by name "test" and delete graph named it', async () => {
      let res = await jsonServices.getByName('test')
      res = await jsonServices.remove(res[0].id)
      expect(res.name).toBe('test')
    })
  })




