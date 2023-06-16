import { NextResponse } from "next/server";
import { join } from "path";

import { getExcel } from "../../../utils/api/getExcel";

export async function GET(request) {
  const filePath = join(process.cwd(), "kontoutdrag.xlsx");
  const data = fs.existsSync(filePath) ? getExcel(filePath) : [];
  return NextResponse.json(data);
}
