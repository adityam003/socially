import Chart4 from './chart4'
import Chart5 from './chart5'
import Chart6 from './chart6'

export default function Carousel(){
    return(
        <div>
            <div className="flex gap-12 flex-col md:flex-row ">
            <Chart4 name="Carousel" />
                  <Chart5 name="Carousel"/>
                  <Chart6 name="Carousel"/>
                  </div>
        </div>
    )
}