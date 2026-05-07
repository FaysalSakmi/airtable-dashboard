import Airtable from "airtable";
import { Candidat } from "@/types";

const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = airtable.base(process.env.AIRTABLE_BASE_ID!);
const TABLE_NAME = process.env.AIRTABLE_TABLE_NAME!;

export async function fetchCandidats(): Promise<Candidat[]> {
  try {
    const records = await base(TABLE_NAME)
      .select({
        view: "Grid view",
        sort: [{ field: "Date de Debut", direction: "desc" }],
      })
      .all();

    return records.map((record) => ({
      id: record.id,
      Condidat: String(record.fields["Condidat"] || ""),
      Filiere: String(record.fields["Filiere"] || ""),
      Etablissement: String(record.fields["Etablissement"] || ""),
      "Numero Telephone": String(record.fields["Numero Telephone"] || ""),
      Email: String(record.fields["Email"] || ""),
      "Date de Debut": String(record.fields["Date de Debut"] || ""),
      "date de Fin": String(record.fields["date de Fin"] || ""),
    }));
  } catch (error) {
    console.error("Error fetching data from Airtable:", error);
    throw error;
  }
}
