import { knex } from "../db/knex"

export const getProfileById = async (req, res) => {
  const { id } = req.params
  try {
    const query = `SELECT * FROM profiles WHERE id = ?`
    const { rows } = await knex.raw(query, [id])
    if (rows.length === 0) {
      return res.status(404).send("Profile not found")
    }
    const user = rows[0]
    res.send(user)
  } catch (err) {
    console.error(err)
    res.status(500).send("Server error")
  }
}
