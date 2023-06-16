// pages/index.server.js
import axios from "axios";
import Layout from "../../components/Layout";

export default async function Home() {
  const response = await axios.get("http://localhost:3000/api/excel");
  const data = response.data;

  if (!data) return <div>Loading...</div>;
  return <Layout tableData={data} />;
}
