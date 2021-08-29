const router = require('express').Router();
const FinancialsData = require('../models/FinancialsData') ;
const tableData = require('../constants') ;


router.get('/', async (req,res)=>{
  const fetchedData = await  FinancialsData.findOne({userId : req.session._id}) ;
  if(fetchedData){
    const table = [
    {
      topic : "Revenues" , 
      "Y-1" : fetchedData.Revenues[0] || "0" , 
      "Y" : fetchedData.Revenues[1]   || "0" , 
      "Y+1" : fetchedData.Revenues[2]   || "0" , 
      "Y+2" : fetchedData.Revenues[3]   || "0" 
    },
    {
      topic : "Cost of Goods" , 
      "Y-1" : fetchedData["Cost of Goods"][0] || "0" , 
      "Y" : fetchedData["Cost of Goods"][1]  || "0", 
      "Y+1" : fetchedData["Cost of Goods"][2] || "0" , 
      "Y+2" : fetchedData["Cost of Goods"][3]  || "0"
    },
    {
      topic : "Salaries" , 
      "Y-1" : fetchedData["Salaries"][0] || "0" , 
      "Y" : fetchedData["Salaries"][1] || "0" , 
      "Y+1" : fetchedData["Salaries"][2] || "0" , 
      "Y+2" : fetchedData["Salaries"][3]  || "0"
    },
    {
      topic : "Operation Cost" , 
      "Y-1" : fetchedData["Operation Cost"][0] || "0" , 
      "Y" : fetchedData["Operation Cost"][1] || "0" , 
      "Y+1" : fetchedData["Operation Cost"][2]  || "0", 
      "Y+2" : fetchedData["Operation Cost"][3]  || "0"
    },
    {
      topic : "EBITDA" , 
      "Y-1" : fetchedData["EBITDA"][0]|| "0"  , 
      "Y" : fetchedData["EBITDA"][1]|| "0"  , 
      "Y+1" : fetchedData["EBITDA"][2]|| "0"  , 
      "Y+2" : fetchedData["EBITDA"][3]  || "0"
    },
    {
      topic : "D&A" , 
      "Y-1" : fetchedData["D&A"][0]  || "0", 
      "Y" : fetchedData["D&A"][1]  || "0", 
      "Y+1" : fetchedData["D&A"][2] || "0" , 
      "Y+2" : fetchedData["D&A"][3]  || "0"
    },
    {
      topic : "EBIT" , 
      "Y-1" : fetchedData["EBIT"][0] || "0" , 
      "Y" : fetchedData["EBIT"][1] || "0" , 
      "Y+1" : fetchedData["EBIT"][2] || "0" , 
      "Y+2" : fetchedData["EBIT"][3] || "0" 
    },
    {
      topic : "Interest" , 
      "Y-1" : fetchedData["Interest"][0] || "0" , 
      "Y" : fetchedData["Interest"][1]  || "0", 
      "Y+1" : fetchedData["Interest"][2] || "0" , 
      "Y+2" : fetchedData["Interest"][3] || "0" 
    },
    {
      topic : "Taxes" , 
      "Y-1" : fetchedData["Taxes"][0] || "0" , 
      "Y" : fetchedData["Taxes"][1] || "0" , 
      "Y+1" : fetchedData["Taxes"][2] || "0" , 
      "Y+2" : fetchedData["Taxes"][3]  || "0"
    },
    {
      topic : "Net Profit" , 
      "Y-1" : fetchedData["Net Profit"][0] || "0" , 
      "Y" : fetchedData["Net Profit"][1] || "0" , 
      "Y+1" : fetchedData["Net Profit"][2] || "0" , 
      "Y+2" : fetchedData["Net Profit"][3]  || "0"
    },
    {
      topic : "Recieveables" , 
      "Y-1" : fetchedData["Recieveables"][0] || "0" , 
      "Y" : fetchedData["Recieveables"][1] || "0" , 
      "Y+1" : fetchedData["Recieveables"][2]  || "0", 
      "Y+2" : fetchedData["Recieveables"][3] || "0" 
    },
    {
      topic : "Inventory" , 
      "Y-1" : fetchedData["Inventory"][0] || "0" , 
      "Y" : fetchedData["Inventory"][1] || "0" , 
      "Y+1" : fetchedData["Inventory"][2]  || "0", 
      "Y+2" : fetchedData["Inventory"][3]  || "0"
    },
    {
      topic : "Payables" , 
      "Y-1" : fetchedData["Payables"][0] || "0" , 
      "Y" : fetchedData["Payables"][1]  || "0", 
      "Y+1" : fetchedData["Payables"][2]  || "0", 
      "Y+2" : fetchedData["Payables"][3]  || "0"
    },
    {
      topic : "Working Capital" , 
      "Y-1" : fetchedData["Working Capital"][0]  || "0", 
      "Y" : fetchedData["Working Capital"][1]  || "0", 
      "Y+1" : fetchedData["Working Capital"][2]  || "0", 
      "Y+2" : fetchedData["Working Capital"][3]  || "0"
    },
    {
      topic : "Capital expenditures" , 
      "Y-1" : fetchedData["Capital expenditures"][0]  || "0" , 
      "Y" : fetchedData["Capital expenditures"][1]  || "0" , 
      "Y+1" : fetchedData["Capital expenditures"][2]  || "0" , 
      "Y+2" : fetchedData["Capital expenditures"][3]  || "0" 
    },
    {
      topic : "Debt at the end of the year" , 
      "Y-1" : fetchedData["Debt at the end of the year"][0]  || "0" , 
      "Y" : fetchedData["Debt at the end of the year"][1]   || "0", 
      "Y+1" : fetchedData["Debt at the end of the year"][2]  || "0" , 
      "Y+2" : fetchedData["Debt at the end of the year"][3]  || "0" 
    },
    {
      topic : "Change in outstanding debt" , 
      "Y-1" : fetchedData["Change in outstanding debt"][0] || "0" , 
      "Y" : fetchedData["Change in outstanding debt"][1]   || "0", 
      "Y+1" : fetchedData["Change in outstanding debt"][2]  || "0" , 
      "Y+2" : fetchedData["Change in outstanding debt"][3] || "0" 
    },
    {
      topic : "Future Funding" , 
      "Y-1" : fetchedData["Future Funding"][0]  || "0", 
      "Y" : fetchedData["Future Funding"][1]  || "0", 
      "Y+1" : fetchedData["Future Funding"][2]  || "0", 
      "Y+2" : fetchedData["Future Funding"][3]  || "0"
    },
    {
      topic : "Free cash flow" , 
      "Y-1" : fetchedData["Free cash flow"][0]  || "0", 
      "Y" : fetchedData["Free cash flow"][1]  || "0", 
      "Y+1" : fetchedData["Free cash flow"][2]  || "0", 
      "Y+2" : fetchedData["Free cash flow"][3]  || "0"
    }
];
res.render("Financials" , {tableData : table}) ;
  }else{
    res.render("Financials" , {tableData: tableData} ) ;
  }
});

router.post('/' , async(req,res)=>{
  const fetchedData = await  FinancialsData.findOne({userId:req.session.user._id}) ;
  if(fetchedData){
    fetchedData.userId = req.session.user._id ;
    fetchedData.Revenues =[ req.body.Revenues["Y-1"] ,req.body.Revenues["Y"] ,req.body.Revenues["Y+1"] ,req.body.Revenues["Y+2"]];
    fetchedData['Cost Of Goods'] =[ req.body['Cost Of Goods["Y-1"]'] ,req.body['Cost Of Goods["Y"]'] ,req.body['Cost Of Goods["Y+1"]'] ,req.body['Cost Of Goods["Y+2"]']] ; 
    fetchedData.Salaries = [ req.body.Salaries["Y-1"] ,req.body.Salaries["Y"] ,req.body.Salaries["Y+1"] ,req.body.Salaries["Y+2"]];
    fetchedData["Operation Cost"] = [ req.body['Operation Cost["Y-1"]'] ,req.body['Operation Cost["Y"]'] ,req.body['Operation Cost["Y+1"]'] ,req.body['Operation Cost["Y+2"]']] ; 
    fetchedData["EBITDA"] = [ req.body['EBIDTA["Y-1"]'],req.body['EBIDTA["Y"]'],req.body['EBIDTA["Y+1"]'],req.body['EBIDTA["Y+2"]']] ;
    fetchedData["D&A"] = [ req.body['D&A["Y-1"]'],req.body['D&A["Y"]'],req.body['D&A["Y+1"]'],req.body['D&A["Y+2"]']] ;
    fetchedData["EBIT"] = [ req.body['EBIT["Y-1"]'],req.body['EBIT["Y"]'],req.body['EBIT["Y+1"]'],req.body['EBIT["Y+2"]']] ;
    fetchedData.Interest = [ req.body['Interest["Y-1"]'],req.body['Interest["Y"]'],req.body['Interest["Y+1"]'],req.body['Interest["Y+2"]']] ;
    fetchedData.Taxes = [ req.body['Taxes["Y-1"]'],req.body['Taxes["Y"]'],req.body['Taxes["Y+1"]'],req.body['Taxes["Y+2"]']] ;
    fetchedData["Net Profit"] = [ req.body['Net Profit["Y-1"]'],req.body['Net Profit["Y"]'],req.body['Net Profit["Y+1"]'],req.body['Net Profit["Y+2"]']] ;
    fetchedData.Recieveables = [ req.body['Recieveables["Y-1"]'],req.body['Recieveables["Y"]'],req.body['Recieveables["Y+1"]'],req.body['Recieveables["Y+2"]']] ;
    fetchedData.Inventory = [ req.body['Inventory["Y-1"]'],req.body['Inventory["Y"]'],req.body['Inventory["Y+1"]'],req.body['Inventory["Y+2"]']] ;
    fetchedData.Payables = [ req.body['Payables["Y-1"]'],req.body['Payables["Y"]'],req.body['Payables["Y+1"]'],req.body['Payables["Y+2"]']] ;
    fetchedData["Working Capital"] = [ req.body['Working Capital["Y-1"]'],req.body['Working Capital["Y"]'],req.body['Working Capital["Y+1"]'],req.body['Working Capital["Y+2"]']] ;
    fetchedData["Capital expenditures"] = [ req.body['Capital expenditures["Y-1"]'],req.body['Capital expenditures["Y"]'],req.body['Capital expenditures["Y+1"]'],req.body['Capital expenditures["Y+2"]']] ;
    fetchedData["Debt at the end of the year"] = [ req.body['Debt at the end of the year["Y-1"]'],req.body['Debt at the end of the year["Y"]'],req.body['Debt at the end of the year["Y+1"]'],req.body['Debt at the end of the year["Y+2"]']] ;
    fetchedData["Change in outstanding debt"] = [ req.body['Change in outstanding debt["Y-1"]'],req.body['Change in outstanding debt["Y"]'],req.body['Change in outstanding debt["Y+1"]'],req.body['Change in outstanding debt["Y+2"]']] ;
    fetchedData["Future Funding"] = [ req.body['Future Funding["Y-1"]'],req.body['Future Funding["Y"]'],req.body['Future Funding["Y+1"]'],req.body['Future Funding["Y+2"]']] ;
    fetchedData["Free cash flow"] = [ req.body['Free cash flow["Y-1"]'],req.body['Free cash flow["Y"]'],req.body['Free cash flow["Y+1"]'],req.body['Free cash flow["Y+2"]']] ;


    fetchedData["Cash and equivalents"] = req.body['Cash and equivalents'] ;
    fetchedData["Tangible Assets"] = req.body['Tangible Assets'] ;
    fetchedData["Financial Assets"] = req.body['Financial Assets'] ;
    fetchedData["Differed Tax Assets"] = req.body['Differed Tax Assets'] ;
    fetchedData["Debts due within one year time"] = req.body['Debts due within one year time'] ;
    fetchedData["Debts due beyond one year time"] = req.body['Debts due beyond one year time'] ;
    fetchedData.Equity = req.body['Equity'] ;
    
    await fetchedData.save() ; 
  }else{
    const newData = new  FinancialsData({
      userId : req.session.user._id ,
      Revenues : [ req.body.Revenues["Y-1"] ,req.body.Revenues["Y"] ,req.body.Revenues["Y+1"] ,req.body.Revenues["Y+2"]],
      'Cost Of Goods' : [ req.body['Cost Of Goods["Y-1"]'] ,req.body['Cost Of Goods["Y"]'] ,req.body['Cost Of Goods["Y+1"]'] ,req.body['Cost Of Goods["Y+2"]']] ,
      Salaries : [ req.body.Salaries["Y-1"] ,req.body.Salaries["Y"] ,req.body.Salaries["Y+1"] ,req.body.Salaries["Y+2"]],
      "Operation Cost" : [ req.body['Operation Cost["Y-1"]'] ,req.body['Operation Cost["Y"]'] ,req.body['Operation Cost["Y+1"]'] ,req.body['Operation Cost["Y+2"]']] , 
      "EBITDA" : [ req.body['EBIDTA["Y-1"]'],req.body['EBIDTA["Y"]'],req.body['EBIDTA["Y+1"]'],req.body['EBIDTA["Y+2"]']] ,
      "D&A" : [ req.body['D&A["Y-1"]'],req.body['D&A["Y"]'],req.body['D&A["Y+1"]'],req.body['D&A["Y+2"]']] ,
      "EBIT" : [ req.body['EBIT["Y-1"]'],req.body['EBIT["Y"]'],req.body['EBIT["Y+1"]'],req.body['EBIT["Y+2"]']] ,
      Interest : [ req.body['Interest["Y-1"]'],req.body['Interest["Y"]'],req.body['Interest["Y+1"]'],req.body['Interest["Y+2"]']] ,
      Taxes : [ req.body['Taxes["Y-1"]'],req.body['Taxes["Y"]'],req.body['Taxes["Y+1"]'],req.body['Taxes["Y+2"]']] ,
      "Net Profit" : [ req.body['Net Profit["Y-1"]'],req.body['Net Profit["Y"]'],req.body['Net Profit["Y+1"]'],req.body['Net Profit["Y+2"]']] ,
      Recieveables : [ req.body['Recieveables["Y-1"]'],req.body['Recieveables["Y"]'],req.body['Recieveables["Y+1"]'],req.body['Recieveables["Y+2"]']] ,
      Inventory : [ req.body['Inventory["Y-1"]'],req.body['Inventory["Y"]'],req.body['Inventory["Y+1"]'],req.body['Inventory["Y+2"]']] ,
      Payables : [ req.body['Payables["Y-1"]'],req.body['Payables["Y"]'],req.body['Payables["Y+1"]'],req.body['Payables["Y+2"]']] ,
      "Working Capital" : [ req.body['Working Capital["Y-1"]'],req.body['Working Capital["Y"]'],req.body['Working Capital["Y+1"]'],req.body['Working Capital["Y+2"]']] ,
      "Capital expenditures" : [ req.body['Capital expenditures["Y-1"]'],req.body['Capital expenditures["Y"]'],req.body['Capital expenditures["Y+1"]'],req.body['Capital expenditures["Y+2"]']] ,
      "Debt at the end of the year" : [ req.body['Debt at the end of the year["Y-1"]'],req.body['Debt at the end of the year["Y"]'],req.body['Debt at the end of the year["Y+1"]'],req.body['Debt at the end of the year["Y+2"]']] ,
      "Change in outstanding debt" : [ req.body['Change in outstanding debt["Y-1"]'],req.body['Change in outstanding debt["Y"]'],req.body['Change in outstanding debt["Y+1"]'],req.body['Change in outstanding debt["Y+2"]']] ,
      "Future Funding" : [ req.body['Future Funding["Y-1"]'],req.body['Future Funding["Y"]'],req.body['Future Funding["Y+1"]'],req.body['Future Funding["Y+2"]']] ,
      "Free cash flow" : [ req.body['Free cash flow["Y-1"]'],req.body['Free cash flow["Y"]'],req.body['Free cash flow["Y+1"]'],req.body['Free cash flow["Y+2"]']] ,
      "Cash and equivalents" : req.body["Cash and Equivalents"] ,
      "Tangible Assets" : req.body['Tangible Assets'] ,
      "Intangible Assets" : req.body['Intangible Assets'] ,
      "Financial Assets" : req.body['Financial Assets'] ,
      "Differed Tax Assets" : req.body['Differed Tax Assets'] ,
      "Debts due within one year time" : req.body['Debts due within one year time'] ,
      "Debts due beyond one year time" : req.body['Debts due beyond one year time'] ,
      Equity : req.body['Equity'] 
    }) ;
    await newData.save() ; 
  }
  res.redirect('/financial') ;
});

module.exports = router ;