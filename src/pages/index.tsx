import Graph from '@/components/Graph';
import PieChart from '@/components/PieChart';
import Sidebar from '@/components/Sidebar';
import { faCalendar, faClock, faUser } from '@fortawesome/free-regular-svg-icons';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function Home() {
  const links = {
    '': [
      { href: '#', label:'Dashboard', icon:faCalendar },
      { href: '#', label:'Item 1', icon:faCalendar },
      { href: '#', label:'Item 2', icon:faCalendar },
      { href: '#', label:'Item 3', icon:faCalendar },
    ],
    'OTHERS 1': [
      { href: '#', label:'Item 4', icon:faClock },
      { href: '#', label:'Item 5', icon:faClock }
    ],
    'OTHERS 2': [
      { href: '#', label:'Item 6', icon:faUser },
      { href: '#', label:'Item 7', icon:faUser },
      { href: '#', label:'Item 8', icon:faUser }
    ]
  }
  const days = ['1 Day', '3 Days', '7 Days', '30 Days', 'All Time', 'Custom Date']

  const { isLoading, data, error } = useQuery(['views'], async () => {
    const response = await axios.get('https://fe-task-api.mainstack.io/')
    return response.data
  })
  if (isLoading) {
    return <div>Loading...</div>
  }
  let cities: string[] = []
  let cityCount: number[] = []
  let percent: number[] = []
  let sources: string[] = []
  let sourceCount: number[] = []
  let sourcePercent: number[] = []
  let bgColor: string[] = ['rgba(89, 158, 234, 1)', 'rgba(132, 79, 246, 1)', 'rgba(15, 183, 122, 1)', 'rgba(250, 183, 10, 1)', 'rgba(240, 148, 104, 1)']

  for (const items of data['top_locations']) {
    cities.push(items.country)
    cityCount.push(items.count)
    percent.push(items.percent)
  }

  for (const items of data['top_sources']) {
    sources.push(items.source)
    sourceCount.push(items.count)
    sourcePercent.push(items.percent)
  }

  return (
    <div className='site-map'>
      <Sidebar links={links}/>
      <main className='mt-2 relative mx-6 px-6 py-4'>
        <h5 className='font-bold'>Dashboard</h5>

        <div className='flex items-center justify-between'>
          <div className='mt-9'>
            <h2 className='text-2xl font-bold leading-8 text-[#131316]'>Good morning, Blessing ⛅️</h2>
            <p className='text-[#31373D] leading-6 mt-2'>Check out your dashboard summary</p>
          </div>
          <div>
            <p className='text-[#FF5403] text-xs'>View analytics</p>
          </div>
        </div>

        <div className='flex items-center mt-9'>
          {
            days.map((day, index: number) =>(
              <li key={index} className={day == 'All Time' ? 'mr-8 list-none border border-[#FF5403] font-bold text-xs text-[#FF5403] rounded-2xl px-4 p-2 bg-[#FFDDCD]' : 'border border-[#EFF1F6] rounded-2xl mr-8 px-4 p-2 text-xs font-bold list-none' }>{day}</li>
            ))
          }
        </div>

        <div className='mt-12'>
          <h4 className='font-bold text-2xl'>Page Views</h4>
          <p className='mt-4'>All time</p>
          <Graph />
        </div>

        <div className='flex items-center justify-center gap-6 p-2 mt-3'>
          <div className='w-full mr-6'>
            <div className='flex justify-between'>
              <h4 className='font-bold'>Top Locations</h4>
              <p className='text-[#FF5403] text-xs right-0'>View full reports</p>
            </div>
            <div>
              <PieChart list={cities} bgColors={bgColor} percent={percent} count={cityCount}/>
            </div>
            
          </div>

          <div className='w-full'>
            <div className='flex justify-between'>
              <h4 className='font-bold'>Top Referral Source</h4>
              <p className='text-[#FF5403] text-xs right-0'>View full reports</p>
            </div>
            <div>
              <PieChart list={sources} bgColors={bgColor} percent={sourcePercent} count={sourceCount}/>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}
