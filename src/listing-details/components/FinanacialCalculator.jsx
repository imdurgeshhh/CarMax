import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

function FinanacialCalculator({ carDetails }) {

    const [carPrice,setCarPrice]=useState('');
    const [interestRate,setInterestRate]=useState('');
    const [loanTerm,setLoanTerm]=useState('');
    const [downPayment,setDownPayment]=useState('');
    const [monthlyPayment,setMonthlyPayment]=useState('');

    const CalculateMonthlyPayment=()=>{
        const principal=Number(carPrice)-Number(downPayment);
        const monthlyInterestRate=Number(interestRate)/1200;
        const term=Number(loanTerm);

        const MonthlyPayment=(principal*monthlyInterestRate*Math.pow(1+monthlyInterestRate,term))/(Math.pow(1+monthlyInterestRate,term)-1);
        setMonthlyPayment(MonthlyPayment.toFixed(2));
    }


  return (
    <div className='p-10 border rounded-xl shadow-md mt-7'>
        <h2 className='font-medium text-2xl'>Finanacial Calculator</h2>
        <div className='flex gap-5 mt-5'>
            <div className='w-full'>
                <label>price ₹</label>
                <Input type='number' value={carPrice} onChange={(e)=>setCarPrice(e.target.value)}/>
            </div>
            <div  className='w-full'>
                <label>Interest Rate</label>
                <Input type='number' value={interestRate} onChange={(e)=>setInterestRate(e.target.value)}/>
            </div>
        </div>
        <div className='flex gap-5 mt-5'>
            <div className='w-full'>
                <label>Loan Term (Months)</label>
                <Input type='number' value={loanTerm} onChange={(e)=>setLoanTerm(e.target.value)}/>
            </div>
            <div  className='w-full'>
                <label>Down Payment</label>
                <Input type='number' value={downPayment} onChange={(e)=>setDownPayment(e.target.value)}/>
            </div>
        </div>
        {monthlyPayment>0&& <h2 className='font-medium text-2xl mt-5'>Your Monthly Payment Is :<span className=' font-bold text-4xl'>₹{monthlyPayment}</span></h2>}
        <Button className='w-full mt-5' size='lg'
        onClick={CalculateMonthlyPayment}
        >Calculate</Button>
    </div>
  )
}

export default FinanacialCalculator
