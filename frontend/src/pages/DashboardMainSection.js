import SideMenu from "../components/SideMenu";
import MainContent from "../components/MainContent";

function DashboardMainSection() {
  return (
    <div className="container">
      <section className="dashboardMainSection">
        <SideMenu />
        <MainContent />
      </section>
    </div>
  );
}

export default DashboardMainSection;
