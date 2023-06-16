import { NextResponse } from "next/server";
import { join } from "path";
import fs from "fs";

import { getExcel } from "../../../utils/api/getExcel";

export async function GET() {
  const filePath = join(process.cwd(), "kontoutdrag.xlsx");
  const data = fs.existsSync(filePath) ? getExcel(filePath) : [];
  return NextResponse.json(data);
}
