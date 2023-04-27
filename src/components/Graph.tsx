import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

const Graph = () => {
  const { isLoading, data, error } = useQuery(['views'], async () => {
    const response = await axios.get('https://fe-task-api.mainstack.io/')
    return response.data
  })
  if (isLoading) {
    return <div>Loading...</div>
  }

  const getDate = (date: string): string => {
    const dat = new Date(date);
    return dat.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  }
  
  let dates: string[] = []
  let values: number[] = []

  for (const element in data['graph_data']['views']){
    dates.push(getDate(element))
    values.push(data['graph_data']['views'][element])
  }
  
  const options = {
    responsive: true,
    maintainAspectRatio: false
  };

  const graphData = {
    labels: dates,
    datasets: [
      {
        fill: true,
        label: 'Dataset 2',
        data: values,
        borderColor: 'rgb(255, 84, 3, 0.2)',
        backgroundColor: 'rgba(255, 84, 3, 0.1)'
      },
    ],
  };

  return (
    <div className='mt-2'>
      <Line options={options} data={graphData} height='376px' />
    </div>
  )
}

export default Graph;