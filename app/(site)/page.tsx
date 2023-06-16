// pages/index.server.js
import Layout from "../../components/Layout";
import { join } from "path";
import { getExcel } from "../../utils/api/getExcel";
import fs from "fs";

export default async function Home() {
  const filePath = join(process.cwd(), "kontoutdrag.xlsx");
  const data = fs.existsSync(filePath) ? getExcel(filePath) : [];

  if (!data) return <div>Loading...</div>;
  return <Layout tableData={data} />;
}
