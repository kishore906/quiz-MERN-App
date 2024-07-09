import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function OverallAdminGraphStats({ graphStats }) {
  const options = {
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Quizzes given by users in each month",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
    },
  };

  const labels = graphStats?.quizzesInEachMonth?.map((obj) => obj?.monthName);

  const data = {
    labels,
    datasets: [
      {
        label: "Quizzes",
        data: graphStats?.quizzesInEachMonth?.map((obj) => obj?.count),
        borderColor: "#198753",
        backgroundColor: "rgba(42, 117, 83, 0.5)",
        yAxisID: "y",
      },
    ],
  };
  return <Line options={options} data={data} />;
}
