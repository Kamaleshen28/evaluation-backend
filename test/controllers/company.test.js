const controllers = require('../../src/controllers/company');
const services = require('../../src/services/company');
const httpError = require('../../src/utils/httpError');

describe('Controllers', () => {
  describe('addCompany', () => {
    it('should save the data to the database when the input url is correct', async () => {
      jest.spyOn(services, 'readCSV').mockResolvedValue([{}]);
      jest.spyOn(services, 'getCompanyWithScore').mockResolvedValue([{}]);
      const mockReq = {
        body: { urlLink: 'https://store-0001.s3.amazonaws.com/input.csv' }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.addCompany(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(201);
      expect(mockRes.json).toBeCalledWith({ message: 'Succesfully uploaded data to the database', data: [{}] });
    });
    it('should throw internal server error if there is a db error', async () => {
      jest.spyOn(services, 'readCSV').mockResolvedValue([{}]);
      jest.spyOn(services, 'getCompanyWithScore').mockRejectedValue(new Error('DB Error'));
      const mockReq = {
        body: { urlLink: 'https://store-0001.s3.amazonaws.com/input.csv' }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.addCompany(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({ msg: 'Something went wrong, try again later..' });
    });
  });


  describe('updateCompanyDetails', () => {
    it('should upadte the data to the database when the input is correct', async () => {
      jest.spyOn(services, 'updateCompanyDetail').mockResolvedValue([1]);
      const mockReq = {
        body: { ceo: 'kamal' },
        params: { id: 'hsdkj5426' }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.updateCompanyDetails(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(201);
      expect(mockRes.json).toBeCalledWith({ message: 'Succesfully updated data to the database', data: [1] });
    });
    it('should throw http error if the company with the given id is not found', async () => {
      jest.spyOn(services, 'updateCompanyDetail').mockRejectedValue(new httpError('Not Found', 404));
      const mockReq = {
        body: { ceo: 'kamal' },
        params: { id: 'hsdkj5426' }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.updateCompanyDetails(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(404);
      expect(mockRes.json).toBeCalledWith({ msg: 'Not Found' });
    });
    it('should throw internal server error if there is a db error', async () => {
      jest.spyOn(services, 'updateCompanyDetail').mockRejectedValue(new Error('Error'));
      const mockReq = {
        body: { ceo: 'kamal' },
        params: { id: 'hsdkj5426' }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.updateCompanyDetails(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({ msg: 'Something went wrong, try again later..' });
    });
  });
});