const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const teamsData = JSON.parse(fs.readFileSync("data/data.json"));

//get all teams data
app.get("/teams", (req, res) => {
  res.status(200).json({
    status: "SUCCESS",
    data: {
      teams: teamsData,
    },
  });
});

// add a new team into the data
app.post("/team", (req, res) => {
  const newTeam = {
    id: teamsData.length + 1,
    ...req.body,
  };
  teamsData.push(newTeam);
  fs.writeFile("data/data.json", JSON.stringify(teamsData), (err) => {
    //error handling
  });

  res.status(200).json({
    status: "SUCCESS",
    data: {
      message: "You have successfully updated team",
    },
  });
});

//update team
app.patch("/team/:id", (req, res) => {
  const { id } = req.params;
  const updatedData = teamsData.map((team) => {
    if (team.id == id) {
      return {
        ...team,
        ...req.body,
      };
    }
    return team;
  });

  fs.writeFile("data/data.json", JSON.stringify(updatedData), (err) => {
    //error handling
  });
  res.status(200).json({
    status: "SUCCESS",
    data: { message: "You have successfully updated team" },
  });
});

//delete team
app.delete("/team/:id", (req, res) => {
  const { id } = req.params;
  const updatedData = teamsData.filter((team) => team.id != id);

  fs.writeFile("data/data.json", JSON.stringify(updatedData), (err) => {
    //error handling
  });
  res.status(200).json({
    status: "SUCCESS",
    data: { message: "You have successfully deleted team" },
  });
});

app.listen(8000, "127.0.0.1", () => {
  console.log("Server is running at port 8000");
});
