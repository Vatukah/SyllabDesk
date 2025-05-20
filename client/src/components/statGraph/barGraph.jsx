import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  Filler,
} from "chart.js";
import { useAdmin } from "../../contexts/providers/adminProvider";
import { useEffect, useState, useRef } from "react";
import DatePicker from "react-multi-date-picker";
import { CalendarDateRangeIcon } from "@heroicons/react/24/outline";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

export default function BarGraph() {
  const { loading, totalUsers } = useAdmin();
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);
  const [toDate, setToDate] = useState(new Date());
  let sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(new Date().getDate() - 7);
  const [fromDate, setFromDate] = useState(sevenDaysAgo);
  const datePickerRef = useRef();

  const [values, setValues] = useState([fromDate, toDate]);

  const openDatePicker = () => {
    if (datePickerRef.current) {
      datePickerRef.current.openCalendar();
    }
  };
  const handleChangeDate = (e) => {
    let dateRange = [];
    const nativeDate = e.map((date) => date.toDate());
    const userfromDate = nativeDate[0];
    const usertoDate = nativeDate[1] || nativeDate[0];

    setFromDate(userfromDate);
    setToDate(usertoDate);
    setValues(nativeDate);
  };
  function formatDateRangeWithoutYearIfSame(fromDate, toDate) {
  const sameYear = fromDate?.getFullYear() === toDate?.getFullYear();

  const formatOptions = (withYear) => ({
    month: "short",
    day: "numeric",
    ...(withYear && { year: "numeric" }),
  });

  return [
    fromDate.toLocaleDateString("en-US", formatOptions(!sameYear)),
    toDate.toLocaleDateString("en-US", formatOptions(!sameYear)),
  ];
}


  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    if (!loading && totalUsers.length) {
      const today = new Date();
      const dates = [];
      const startDate = new Date(fromDate); // ✅ Clone to avoid mutation
      const endDate = new Date(toDate || fromDate);

      while (startDate <= endDate) {
        const formatedDate = startDate.toISOString().slice(0, 10);

        dates.push(formatedDate);

        startDate.setDate(startDate.getDate() + 1);
      }
      const grouped = {};

      totalUsers.forEach((user) => {
        const date = user?.created_at.slice(0, 10); // Format: YYYY-MM-DD
        grouped[date] = (grouped[date] || 0) + 1;
      });

      

      setChartData({
        labels: dates,
        datasets: [
          {
            label: "Signups per day",
            data: dates.map((date) => grouped[date] || 0),
            backgroundColor: " rgba(240, 167, 103,.2)",
            borderColor: "rgba(240, 167, 103,1)",
            borderWidth: 2,
            fill: true,
            tension: 0.3,
            pointRadius: 0,
            barThickness: 4,
          },
        ],
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [loading, totalUsers, fromDate, toDate]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax:
          chartData?.datasets?.[0]?.data?.length > 0
            ? Math.max(...chartData.datasets[0].data) + 1
            : 5,
        ticks: {
          // Force step of 1
          stepSize: 1,
          // Hide decimal ticks by only showing integers
          callback: function (value) {
            return Number.isInteger(value) ? value : null;
          },
        },
      },
    },
  };

  return (
    <div className="w-[400px]  p-1 rounded-md shadow-md border border-[rgba(var(--accent-light),0.5)]">
      <div className="p-2 flex justify-between">
        {" "}
        <h3 className="text-accent font-bold">Sign Ups</h3>
        <div className="border border-gray-400 flex gap-sm rounded-sm px-xs ">
          <div>
            {formatDateRangeWithoutYearIfSame(fromDate,toDate).map((date,index)=> {
              if(index === 1) {
                return <>
                <span className="inline-block mx-xs">-</span>
                <div className="inline-block text-xs font-bold ">{date}</div>
                </> 
              }else{
                return <div className="inline-block text-xs font-bold">{date}</div>
              }
             
              })}
          </div>
          <button onClick={openDatePicker}>
            <CalendarDateRangeIcon className="w-6 text-accent " />
          </button>
          {/*select data */}
          <DatePicker
            range
            value={values}
            render={"none"}
            ref={datePickerRef}
            onChange={handleChangeDate}
          />
        </div>
      </div>
      {loading || !chartData ? (
        <div>Loading...</div>
      ) : (
        <Line
          data={chartData}
          options={options}
          ref={(el) => {
            if (el) chartRef.current = el.chart;
          }}
        />
      )}
    </div>
  );
}
