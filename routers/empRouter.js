const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
  //  사원 번호 사원명 직무 입사일 급여 부서명 근무지를 조회 하세요

  console.log(req.query.sDept);

  let deptValue = req.query.sDept || "";
  const selectQuery = `
    SELECT A.EMPNO,
           A.ENAME,
           A.JOB,
           DATE_FORMAT(A.HIREDATE, '%Y-%m-%d') AS HIREDATE,
           CONCAT("$" , FORMAT(A.SAL, 0))      AS SAL,
           B.DNAME,
           B.LOC
      FROM EMP		A
     INNER 
      JOIN DEPT	B
        ON A.DEPTNO = B.DEPTNO
     WHERE B.DNAME LIKE  '${deptValue}%'
     ORDER BY	A.EMPNO ASC
  `;

  try {
    db.query(selectQuery, (err, rows) => {
      console.log(rows);

      res.render("screens/emp", { rows });
    });
  } catch (e) {
    console.error(r);
    return res.redirect("/");
  }
});

module.exports = router;
