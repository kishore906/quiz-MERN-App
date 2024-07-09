import { useEffect } from "react";
import "./overAllStats.css";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
// import { Chart } from "react-chartjs-2";
import { toast } from "react-toastify";
import { useGetUserPerformanceStatsQuery } from "../redux/api/userApi";

function OverallStats() {
  const { error, data: statsData } = useGetUserPerformanceStatsQuery();

  const data = {
    labels: statsData?.labels,
    datasets: [
      {
        data: statsData?.data,
        backgroundColor: [
          "rgb(242,165,152)",
          "rgb(255,232,157)",
          "rgb(236,107,109)",
        ],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],

    plugins: {
      labels: {
        render: "percentage",
        fontColor: ["green", "white", "red"],
        precision: 2,
      },
    },
    text: "25%",
  };

  useEffect(() => {
    toast.error(error?.data?.message);
  }, [error]);

  return (
    <div className="overAllStatsDiv">
      <h3 className="overAllStatsHeading">OverAll Stats</h3>

      {statsData?.totalQuizzes === 0 ? (
        <h4 className="statsMsg">No Stats..</h4>
      ) : (
        <Doughnut data={data} />
      )}
    </div>
  );
}

export default OverallStats;
