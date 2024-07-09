import { useEffect } from "react";
import "./stats.css";
import QuizzessAttemptedStats from "./QuizzessAttemptedStats";
import OverallStats from "./OverallStats";
import { toast } from "react-toastify";
import { useGetUserStatsQuery } from "../redux/api/userApi";

function Stats() {
  const { error, data } = useGetUserStatsQuery();

  useEffect(() => {
    if (error) {
      toast.error(error.data.message);
    }
  }, [error]);

  return (
    <>
      <section className="statsSection">
        <div className="statDiv">
          <div className="stat">
            <div className="stat_name_value">
              <h4>Quizzes Attempted</h4>
              <p>{data?.quizzessCount}</p>
            </div>
            <div className="icon firstAndThirdStat">
              <i className="bi bi-list-check"></i>
            </div>
          </div>
        </div>
        <div className="statDiv">
          <div className="stat">
            <div className="stat_name_value">
              <h4>Highest Score</h4>
              <p>{data?.highestScore}</p>
            </div>
            <div className="icon secondStat">
              <i className="bi bi-bar-chart-fill"></i>
            </div>
          </div>
        </div>
        <div className="statDiv">
          <div className="stat">
            <div className="stat_name_value">
              <h4>OverAll Rank</h4>
              <p>{data?.rank}</p>
            </div>
            <div className="icon firstAndThirdStat">
              <i className="bi bi-list-ol"></i>
            </div>
          </div>
        </div>
        <div className="statDiv">
          <div className="stat">
            <div className="stat_name_value">
              <h4>Accuracy</h4>
              <p>{data?.avgAccuracy}%</p>
            </div>
            <div className="icon fourthStat">
              <i className="bi bi-percent"></i>
            </div>
          </div>
        </div>
      </section>

      <section className="quizzessAndOverallStatsSection">
        <QuizzessAttemptedStats />
        <OverallStats />
      </section>
    </>
  );
}

export default Stats;
