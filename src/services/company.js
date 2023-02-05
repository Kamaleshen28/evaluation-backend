const csvParser = require('csv-parser');
const needle = require('needle');
const {company, score} = require('../../database/models');
const HttpError = require('../utils/httpError');

const readCSV  = async (url) => {
  
  const result = [];
  needle
    .get(url)
    .pipe(csvParser())
    .on('data', (data) => {
      result.push(data);
    })
    .on('done', (err) => {
      if (err) console.log('An error has occurred');
      else iterateCsvFile(result);
    });
};

const iterateCsvFile = async (result) => {
  await result.forEach(  (currentValue) => {
    const companyDetailsurl = `http://54.167.46.10/company/${currentValue.company_id}`;
    const getScoreurl = `http://54.167.46.10/sector?name=${currentValue.company_sector}`;
    fetch(companyDetailsurl)
      .then(res =>res.json())
      .then(data =>  alignCompanyData(data));
    fetch(getScoreurl)
      .then(res =>res.json())
      .then(data =>  getCompanyScore(data));
  });
};

const alignCompanyData = async (data) => {
  const companyData = {
    id:data.id, 
    name:data.name, 
    tags:(data.tags),
    ceo:data.ceo,
    numberEmployees:data.numberEmployees
  };
  try{
    await  company.create(companyData) ;
  }catch(error){}
  
};

const getCompanyScore = async (data) => {

  data.forEach(async (ele) => {
    
    const scoreValue = ((ele.performanceIndex[0].value * 10) + 
    (ele.performanceIndex[1].value / 10000) +
     (ele.performanceIndex[2].value * 10) +
     ele.performanceIndex[3].value) / 4;
    const companyObject = {
      idScore:ele.companyId,
      score:Math.floor(scoreValue),
    };
    try{
      await score.create(companyObject) ;
    }catch(error){
    }
  });
  
};

const getCompanyWithScore = async () => {
  return await company.findAll({
    include: [{
      model: score
    }]
  });
};
const fetchTopRankedCompanies = async () => {
  return await company.findAll({
    include: [{
      model: score
    }]
  });
};


const updateCompanyDetail = async (body, idGiven) => {
  const book =  await company.findAll({    
    where:{id:idGiven}
  });
  if(book.length === 0){
    throw new HttpError('Not Found', 404);
  }else{
    return await company.update(body, {    
      where:{id:idGiven}
    });
  }
};


  
module.exports = {readCSV, getCompanyWithScore, fetchTopRankedCompanies, updateCompanyDetail};
  