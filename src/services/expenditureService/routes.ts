import { Router } from "express";
import { ExpenditureService } from "./service";

const expenditureRouter =  Router();
const expenditureService = new ExpenditureService();

expenditureRouter.post('/addExpenditure',(req, res) => {
  const response = expenditureService.addExpense(req.body);
  res.send(response);
})

export default expenditureRouter;