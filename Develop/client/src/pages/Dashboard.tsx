import Table from '../components/Table';
import Card from '../components/Card';

const Dashboard = () => {
  return (
    <div className="container-tertiary">
      <Card />
      <div className="div-left-aligned">
        <h3>Daily Movement 🚀 🌒</h3>
      </div>
      <Table />
    </div>
  );
};

export default Dashboard;
