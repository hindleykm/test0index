import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const git = simpleGit();
const path = "./data.json";

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function run() {
  const total = 125;

  for (let i = 1; i <= total; i++) {
    const x = random.int(0, 40);
    const y = random.int(0, 6);
    const date = moment()
      .subtract(getRndInteger(1, 8), "y")
      .add(x, "w")
      .add(y, "d")
      .format();

    jsonfile.writeFileSync(path, { date });
    await git.add([path]);
    await git.commit(date, { "--date": date });

    console.log(`Created commit ${i}/${total} for date: ${date}`);
  }

  console.log("Pushing all commits to GitHub...");
  await git.push("origin", "main", { "--force": true });
  console.log("Finished successfully!");
}

run().catch((err) => {
  console.error("Execution failed:", err);
  process.exit(1);
});
