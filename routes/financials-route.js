const router = require('express').Router();
const FinancialsData = require('../models/FinancialsData') ;
const tableData = require('../constants') ;


router.get('/financial', (req,res)=>{
  res.render("Financials" , {tableData: tableData} ) ;
})

router.post('/financials' , async(req,res)=>{
  const fetchedData = await FinancialsData.findOne({userId:req.session.user._id}) ;
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
    fetchedData["Capital Expenditures"] = [ req.body['Capital Expenditures["Y-1"]'],req.body['Capital Expenditures["Y"]'],req.body['Capital Expenditures["Y+1"]'],req.body['Capital Expenditures["Y+2"]']] ;
    fetchedData["Debt at the end of the year"] = [ req.body['Debt at the end of the year["Y-1"]'],req.body['Debt at the end of the year["Y"]'],req.body['Debt at the end of the year["Y+1"]'],req.body['Debt at the end of the year["Y+2"]']] ;
    fetchedData["Change in outstanding debt"] = [ req.body['Change in outstanding debt["Y-1"]'],req.body['Change in outstanding debt["Y"]'],req.body['Change in outstanding debt["Y+1"]'],req.body['Change in outstanding debt["Y+2"]']] ;
    fetchedData["Future Funding"] = [ req.body['Future Funding["Y-1"]'],req.body['Future Funding["Y"]'],req.body['Future Funding["Y+1"]'],req.body['Future Funding["Y+2"]']] ;
    fetchedData["Free cash flow"] = [ req.body['Free cash flow["Y-1"]'],req.body['Free cash flow["Y"]'],req.body['Free cash flow["Y+1"]'],req.body['Free cash flow["Y+2"]']] ;


    fetchedData["Cash and equivalents"] = req.body['Cash and equivalents'] ;
    fetchedData["Tangible Assets"] = req.body['Tangible Assets'] ;
    fetchedData["Financial Assets"] = req.body['Financial Assets'] ;
    fetchedData["Differed Tax Assets"] = req.body['Differed Tax Assets'] ;
    fetchedData["Debts due within one year time"] = req.body['Debts due within one year time'] ;
    fetchedData["Debts due beyond one year time"] = req.body['Debts due beyond one year time["Y-1"]'] ;
    fetchedData.Equity = req.body['Equity'] ;
    
    fetchedData.save() ; 
  }else{
    const newData = new FinancialsData({
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
      "Capital Expenditures" : [ req.body['Capital Expenditures["Y-1"]'],req.body['Capital Expenditures["Y"]'],req.body['Capital Expenditures["Y+1"]'],req.body['Capital Expenditures["Y+2"]']] ,
      "Debt at the end of the year" : [ req.body['Debt at the end of the year["Y-1"]'],req.body['Debt at the end of the year["Y"]'],req.body['Debt at the end of the year["Y+1"]'],req.body['Debt at the end of the year["Y+2"]']] ,
      "Change in outstanding debt" : [ req.body['Change in outstanding debt["Y-1"]'],req.body['Change in outstanding debt["Y"]'],req.body['Change in outstanding debt["Y+1"]'],req.body['Change in outstanding debt["Y+2"]']] ,
      "Future Funding" : [ req.body['Future Funding["Y-1"]'],req.body['Future Funding["Y"]'],req.body['Future Funding["Y+1"]'],req.body['Future Funding["Y+2"]']] ,
      "Free cash flow" : [ req.body['Free cash flow["Y-1"]'],req.body['Free cash flow["Y"]'],req.body['Free cash flow["Y+1"]'],req.body['Free cash flow["Y+2"]']] ,
      "Cash and equivalents" : req.body['Cash and equivalents'] ,
      "Tangible Assets" : req.body['Tangible Assets'] ,
      "Financial Assets" : req.body['Financial Assets'] ,
      "Differed Tax Assets" : req.body['Differed Tax Assets'] ,
      "Debts due within one year time" : req.body['Debts due within one year time'] ,
      "Debts due beyond one year time" : req.body['Debts due beyond one year time["Y-1"]'] ,
      Equity : req.body['Equity'] 
    }) ;
    newData.save() ; 
  }
  res.redirect('/financial') ;
});

module.exports = router ;