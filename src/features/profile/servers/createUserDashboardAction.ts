"use server";

import prisma from "@/databases/db";
// import convertCsvToJson from "@/features/files/services/convertCsvToJson";
import { parse } from "papaparse";

type RiskEvaluationRow = {
  "Overall score": string; // CSV data is read as strings
  "Risk index": string;
  "neck risk index": string;
  "shoulder and upper limbs risk index": string;
  "lower limbs risk index": string;
  "pelvic risk index": string;
  "torso risk index": string;
  Mobility: string;
  Stability: string;
  Symmetry: string;
};

export const createUserDashboard = async (
  _previousState: unknown,
  formData: FormData,
) => {
  const file = formData.get("userDashboardFile") as File;
  const id = formData.get("id") as string;

  if (!file) {
    return { fileError: "Please upload a file." };
  }

  const matchHealth = await prisma.riskEvaluation.findUnique({
    where: {
      userId: id,
    },
  });

  try {
    // Convert file into a readable buffer
    const fileContent = await file.text();

    // Parse the CSV content
    const parsedData = parse<RiskEvaluationRow>(fileContent, {
      header: true, // Treat the first row as headers
      skipEmptyLines: true,
    });

    // Access the parsed rows
    const rows = parsedData.data; // Array of rows from the CSV

    if (matchHealth) {
      for (const row of rows) {
        await prisma.riskEvaluation.update({
          where: {
            userId: id,
          },
          data: {
            overallScore: parseFloat(row["Overall score"] || "0"), // Convert to numbers
            riskIndex: parseFloat(row["Risk index"] || "0"),
            neckRiskIndex: parseFloat(row["neck risk index"] || "0"),
            shoulderRiskIndex: parseFloat(
              row["shoulder and upper limbs risk index"] || "0",
            ),
            lowerLimbRiskIndex: parseFloat(
              row["lower limbs risk index"] || "0",
            ),
            pelvicRiskIndex: parseFloat(row["pelvic risk index"] || "0"),
            torsoRiskIndex: parseFloat(row["torso risk index"] || "0"),
            mobility: parseFloat(row["Mobility"] || "0"),
            stability: parseFloat(row["Stability"] || "0"),
            symmetry: parseFloat(row["Symmetry"] || "0"),
            userId: id,
          },
        });
      }
    } else {
      // Example: Save each row to the database
      for (const row of rows) {
        await prisma.riskEvaluation.create({
          data: {
            overallScore: parseFloat(row["Overall score"] || "0"), // Convert to numbers
            riskIndex: parseFloat(row["Risk index"] || "0"),
            neckRiskIndex: parseFloat(row["neck risk index"] || "0"),
            shoulderRiskIndex: parseFloat(
              row["shoulder and upper limbs risk index"] || "0",
            ),
            lowerLimbRiskIndex: parseFloat(
              row["lower limbs risk index"] || "0",
            ),
            pelvicRiskIndex: parseFloat(row["pelvic risk index"] || "0"),
            torsoRiskIndex: parseFloat(row["torso risk index"] || "0"),
            mobility: parseFloat(row["Mobility"] || "0"),
            stability: parseFloat(row["Stability"] || "0"),
            symmetry: parseFloat(row["Symmetry"] || "0"),
            userId: id,
          },
        });
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Error processing CSV:", error);
    return { fileError: "Failed to process the file. Please try again." };
  }
};
