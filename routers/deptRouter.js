const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
  const selectQuery = `
  SELECT DEPTNO,
         DNAME,
         LOC
    FROM DEPT
   ORDER BY DEPTNO ASC;
  `;

  try {
    db.query(selectQuery, (err, rows) => {
      console.log(rows);

      res.render("screens/dept", { rows });
    });
  } catch (e) {
    console.error(e);
    return res.redirect("/");
  }
});

module.exports = router;
