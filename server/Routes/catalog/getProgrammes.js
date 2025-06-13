import { Router } from "express";
import supabase, { supabaseService } from "../../supabaseClient.js";

const getUniversityProgrammes = Router();

getUniversityProgrammes.get("/university_programmes", async (req, res) => {
  const { universityId } = req.query;
  const query = supabase.from("university_programmes");

  try {
    const { data, error } = await query
      .select("*")
      .eq("university_id", universityId);

    if (error) {
      throw new Error(error.message);
    }

    const universityProgrammeId = data.map((uniPrgm) => uniPrgm.programme_id);

    const { data: programmes, error: programmesError } = await getProgrammes(
      universityProgrammeId
    );

    if (programmesError) {
      throw new Error(programmesError.message);
    }
    return res.status(200).json({ programmes,details :data });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

async function getProgrammes(programmeId = null) {
  const query = supabase.from("programmes");
  try {
    if (!programmeId) {
      const { data, error } = await query.select("*");

      if (error) {
        throw new Error(error.message);
      }
      return { data, error: null };
    }

    const { data, error } = await query.select("*").in("id", programmeId);

    if (error) {
      throw new Error(error.message);
    }
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export default getUniversityProgrammes;
