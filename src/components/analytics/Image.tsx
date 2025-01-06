import Chart4 from './chart4'
import Chart5 from './chart5'
import Chart6 from './chart6'

export default function Image(){
    return(
        <div>
            <div className="flex gap-12 flex-col md:flex-row ">
            <Chart4 name="Image" />
                  <Chart5 name="Image"/>
                  <Chart6 name="Image"/>
                  </div>
        </div>
    )
}