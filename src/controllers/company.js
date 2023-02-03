const services = require('../services/company');
const HttpError = require('../utils/httpError');

const addCompany = async (req, res) => {
  try{
    const company = await services.readCSV(req.body.urlLink);
    const companyData = await services.getCompanyWithScore();
    res.status(201).json({message:'Succesfully uploaded data to the database', data:companyData});
  }catch(error){
    if(error instanceof HttpError){
      res.status(error.code).json({msg:error.message});
    }else{
      res.status(500).json({msg:'Something went wrong, try again later..'});
    }
  }
};

// const getTopRankedCompanies = async(req, res) => {
//     const data = 
// }

const updateCompanyDetails = async (req, res) => {
  try{
    const {id} = req.params;
    const companyData = await services.updateCompanyDetail(req.body, id);
    res.status(201).json({message:'Succesfully updated data to the database', data:companyData});
  }catch(error){
    if(error instanceof HttpError){
      res.status(error.code).json({msg:error.message});
    }else{
      res.status(500).json({msg:'Something went wrong, try again later..'});
    }
  }
};

module.exports={addCompany, updateCompanyDetails};