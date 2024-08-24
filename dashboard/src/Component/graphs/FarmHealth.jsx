import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import { farmHealthData } from '../data/farmHealthData'; // Adjust the path as needed
import './FarmHealth.css';
import WaveBackground from '../waveBackground/WaveBackground';
import { toast } from 'react-toastify';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const FarmHealth = () => {
    const { farmName } = useParams(); 
    const chartRef = useRef(null);

    useEffect(() => {
        return () => {
            if (chartRef.current && chartRef.current.chart) {
                chartRef.current.chart.destroy();
            }
        };
    }, []);

    const farmData = farmHealthData[farmName];

    if (!farmData) {
        return <div>Farm data not found</div>;
    }

    const data = {
        labels: ['Moisture Level', 'CO2 Level', 'Temperature', 'Nitrogen', 'Phosphorus', 'Salinity', 'Potassium', 'Pests/Insects', 'Crop Growth'],
        datasets: [
            {
                label: 'Ideal',
                data: [
                    farmData.ideal.moistureLevel,
                    farmData.ideal.co2Level,
                    farmData.ideal.temperature,
                    farmData.ideal.nitrogen,
                    farmData.ideal.phosphorus,
                    farmData.ideal.salinity,
                    farmData.ideal.potassium,
                    farmData.ideal.pestsInsects,
                    farmData.ideal.cropGrowth,
                ],
                backgroundColor: 'rgba(0, 100, 0, 0.8)',
                borderColor: '#006400',
                borderWidth: 6,
                type: 'line',
            },
            {
                label: 'Current',
                data: [
                    farmData.current.moistureLevel,
                    farmData.current.co2Level,
                    farmData.current.temperature,
                    farmData.current.nitrogen,
                    farmData.current.phosphorus,
                    farmData.current.salinity,
                    farmData.current.potassium,
                    farmData.current.pestsInsects,
                    farmData.current.cropGrowth,
                ],
                backgroundColor: 'rgba(200, 1, 2, 0.8)',
                borderColor: '#8B0000',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#fff',
                    font: {
                        size: 14,
                    },
                },
            },
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                callbacks: {
                    label: (context) => {
                        return `${context.dataset.label}: ${context.raw}`;
                    },
                },
            },
        },
        scales: {
            x: {
                stacked: true,
                ticks: {
                    color: '#bbb',
                    font: {
                        size: 12,
                    },
                },
                grid: {
                    color: '#444',
                },
            },
            y: {
                stacked: true,
                ticks: {
                    color: '#bbb',
                    font: {
                        size: 12,
                    },
                },
                grid: {
                    color: '#444',
                },
            },
        },
        elements: {
            bar: {
                borderColor: 'rgba(0,0,0,0.8)',
                borderWidth: 2,
                borderRadius: 15,
                hoverBorderColor: 'rgba(0,0,0,1)',
                hoverBorderWidth: 3,
            },
            line: {
                borderWidth: 3,
                borderColor: 'rgba(255,99,132,1)',
                tension: 0.1,
            },
        },
        animation: {
            duration: 1000,
            easing: 'easeOutBounce',
        },
    };

    const backgroundStyle = {
        backgroundImage: `url(/image/${farmName}.jpg)`,
    };

    let waterOn = false;
    const handleWater = () => {
        if(waterOn){
            waterOn = !waterOn;
            toast.info("Water is of please turn On the water")
        }else{
            waterOn = !waterOn;
            toast.info("Water is on please turn of the water")
        }
    }
    return (
        <WaveBackground>
        <div className='Chart' style={{ backgroundStyle }}>
            <div className="chart-card">
                <div className="chart-container">
                    <Bar ref={chartRef} data={data} options={options} />
                </div>
                {/* Buttons section */}
                
            </div>
                <div className="button-container">
                    <button onClick={() => console.log("Button 1 clicked!")}>AI Action</button>
                    <button onClick={() => toast.warn("High Wind Alert")}>Wind Alert</button>
                    <button onClick={handleWater}>Water Alert</button>
                </div>
        </div>
        </WaveBackground>
    );
};

export default FarmHealth;
