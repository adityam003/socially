import Chart4 from './chart4'
import Chart5 from './chart5'
import Chart6 from './chart6'

export default function Reel(){
    return(
        <div>
            <div className="flex gap-12 flex-col md:flex-row ">
            <Chart4 name="Reel" />
                  <Chart5 name="Reel"/>
                  <Chart6 name="Reel"/>
                  </div>
        </div>
    )
}