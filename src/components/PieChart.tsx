import { Chart as ChartJS, ArcElement, Tooltip, ChartData } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

interface PieChartProps {
  list: string[];
  percent: number[];
  bgColors: string[];
  count: number[];
}

function PieChart({ list, count, percent, bgColors }: PieChartProps): JSX.Element {
  const capitalize = (word: string): string => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }

  const data = {
    labels: list,
    datasets: [
      {
        label: '',
        data: count,
        backgroundColor: bgColors
      }
    ]
  }
  return (
    <div className="flex gap-6 mt-9">
      <div>
      {list.map((item, index) => (
        <div className="flex mb-2 items-center">
          <h4>{capitalize(item)} <span className="font-bold">{percent[index]}%</span></h4>
          <span style={{backgroundColor: bgColors[index]}} className={`ml-4 w-[12px] h-[12px] border rounded-[50%] text-2xl`}></span>
        </div>
        
      ))}
      </div>
      <div className="h-[160.56px] w-[160.56px] p-2 ml-10 pl-10">
        <Pie data={data}/>
      </div>
    </div>
  )
}

export default PieChart;