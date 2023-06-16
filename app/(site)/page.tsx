// pages/index.server.js
import axios from "axios";
import Layout from "../../components/Layout";

export default async function Home() {
  const PUBLIC_URL = process.env.PUBLIC_URL || "";
  const response = await axios.get(`${PUBLIC_URL}/api/excel`);
  const data = response.data;

  if (!data) return <div>Loading...</div>;
  return <Layout tableData={data} />;
}
