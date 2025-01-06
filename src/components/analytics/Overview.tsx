import React from 'react';
import Chart1 from './chart1'
import Chart2 from './chart2'
import Chart3 from './chart3'

const Overview = () => {
  return (
    <div>
        <Chart1/>
        <h1 className='text-2xl font:bold md:text-2xl lg:text-4xl mt-12 mb-4 '>Trends</h1>
      <div className="flex gap-12 flex-col md:flex-row ">
      <Chart2/>
      <Chart3/>
      </div>


          <div className='mb-12'></div>
    </div>
)
};

export default Overview;