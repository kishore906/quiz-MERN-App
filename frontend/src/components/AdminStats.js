import { useEffect } from "react";
import "./adminStats.css";
import OverallAdminGraphStats from "./OverallAdminGraphStats";
import { toast } from "react-toastify";
import { useGetAllAdminStatsQuery } from "../redux/api/adminApi";

function AdminStats() {
  const { error, data } = useGetAllAdminStatsQuery();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  return (
    <section className="statsMainContainer">
      <div className="adminStatsContainer">
        <div className="adminStat">
          <div className="adminStat_name_value">
            <div className="stat_name_value">
              <h4>Total Users</h4>
              <p>{data?.adminStats?.totalUsers}</p>
            </div>
            <div className="adminStat_icon adminfirstStat">
              <i className="bi bi-people-fill"></i>
            </div>
          </div>
        </div>
        <div className="adminStat">
          <div className="adminStat_name_value">
            <div className="stat_name_value">
              <h4>Total Topics</h4>
              <p>{data?.adminStats?.totalTopics}</p>
            </div>
            <div className="adminStat_icon adminsecondStat">
              <i className="bi bi-pie-chart-fill"></i>
            </div>
          </div>
        </div>
        <div className="adminStat">
          <div className="adminStat_name_value">
            <div className="stat_name_value">
              <h4>Total Questions</h4>
              <p>{data?.adminStats?.totalQuestions}</p>
            </div>
            <div className="adminStat_icon adminthirdStat">
              <i className="bi bi-list-ol"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="graphContainer">
        <OverallAdminGraphStats graphStats={data?.graphStats} />
      </div>
    </section>
  );
}

export default AdminStats;
