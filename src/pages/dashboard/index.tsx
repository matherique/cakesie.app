import DashboardLayout from "@components/dashboard-layout";
import privateRoute from "@shared/auth";
import { GetServerSideProps, NextPage } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return privateRoute(context);
}

const Home: NextPage = () => {
  return (
    <DashboardLayout>
      <h1>Bem vindo</h1>
    </DashboardLayout>
  );
};

export default Home;
