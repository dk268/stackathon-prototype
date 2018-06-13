const fs = require("fs");
const { db, Item, Raid, User, Character, Checkpoint } = require("../db");
const Op = db.Op;
const chalk = require("chalk");

//on a trimmed line, slice 27 to get rid of the time/date/whatever header

fs.readFile(
  process.env.SHELL === "C:\\Program Files\\Git\\usr\\bin\\bash.exe"
    ? "D:\\Users\\Public\\Daybreak Game Company\\Installed Games\\EverQuest\\Logs\\eqlog_Goliath_coirnav.txt"
    : "./eqlog_Goliath_coirnav.txt",
  "utf8",
  (err, data) => {
    try {
      const processedArray = splitThenTrimThenSlice(data);
      const [startIndex, endIndex, raidName] = findRaidStartAndEnd(
        processedArray
      );
      const slicedArray = processedArray.slice(startIndex, endIndex);
      let checkpointNames = findCheckpointNames(slicedArray);
      const attendance = {};
      checkpointNames.forEach(
        name => (attendance[name] = renderAttendance(slicedArray, name))
      );
      let items = findItemDrops(slicedArray);
      // console.log(items);
      // console.log(findDummyRaidName(processedArray));
      // console.log(findRaidStartAndEnd(slicedArray));
      // console.log(attendance);
      populateDatabase(raidName, attendance, items);
      return 1;
    } catch (e) {
      console.log(err);
    }
  }
);

function splitThenTrim(text) {
  return text
    .split(`\n`)
    .map(line => line.trim())
    .filter(line => line.length);
}

function splitThenTrimThenSlice(text) {
  return splitThenTrim(text).map(line => line.slice(27));
}

function renderAttendance(processedArr, checkpointName) {
  const start = processedArr.indexOf(
    processedArr.find(line =>
      line.includes(`BEGIN ${checkpointName} ATTENDANCE`)
    )
  );
  const end = processedArr.indexOf(
    processedArr.find(line => line.includes(`END ${checkpointName} ATTENDANCE`))
  );
  const output = [];
  for (let i = start; i < end; i++) {
    if (processedArr[i].includes("<Ashen Oath>")) {
      let bracketIndex = processedArr[i].indexOf(`]`);
      let newLine = processedArr[i].slice(bracketIndex + 2);
      let spaceIndex = newLine.indexOf(` `);
      if (processedArr[i].includes("* RIP *")) spaceIndex -= 2;
      output.push(newLine.slice(0, spaceIndex));
    }
  }
  return output;
}

function findCheckpointNames(processedArr) {
  const output = [];
  for (let i = 0; i < processedArr.length; i++) {
    if (processedArr[i].includes("BEGIN")) {
      output.push(processedArr[i].split(" ")[4]);
    }
  }
  return output;
}

function findItemDrops(processedArr) {
  const output = [];
  const obj = {};
  for (let i = 0; i < processedArr.length; i++) {
    if (processedArr[i].includes("itemDrop")) {
      let newLine = processedArr[i]
        .slice(processedArr[i].indexOf("itemDrop") + 9)
        .split(" ");
      output.push(newLine);
    }
  }
  return output.map(drop => parseItemDrop(drop));
}

function parseItemDrop(arr, currStr = "", parsedArr = []) {
  if (arr.length === 0) {
    let obj = {
      itemName: parsedArr[0],
      characterName: parsedArr[1],
      itemDKPCost: parsedArr[2],
    };
    return obj;
  } else if (arr[0] !== "to" && !parsedArr.length) {
    let word = currStr + arr[0] + " ";
    return parseItemDrop(arr.slice(1), word, parsedArr);
  } else if (arr[0] == "to" && !parsedArr.length) {
    return parseItemDrop([], "", [currStr.trim(), arr[1], arr[3]]);
  }
}

function findRaidStartAndEnd(processedArr) {
  return [
    processedArr.indexOf(
      processedArr.find(e => e.includes("Raidname") && e.includes("begin"))
    ),
    processedArr.indexOf(
      processedArr.find(e => e.includes("Raidname") && e.includes("end"))
    ),
    processedArr.find(e => e.includes("Raidname")).split(" ")[4],
  ];
}

function findDummyRaidName() {
  return "TUE12JUN2018";
}

async function populateDatabase(raidName, attendance, itemsObjArr) {
  try {
    let allCharactersOfTheNight = [];
    await db.sync({ force: true });
    //Take the raid's name and create a new Raid.
    const newRaid = await Raid.findOrCreate({ where: { raidName: raidName } });
    if (!newRaid[1]) {
      //If the raid already exists, skip the rest of this.
      console.log("doooooom!");
      return 1;
    }
    //Take the keys of the atendance object and make a checkpoint for each.
    const checkpoints = await Promise.all(
      [...Object.keys(attendance)].map(cp =>
        Checkpoint.create({ checkpointName: cp })
      )
    );

    //Update the checkpoints with their raid association.
    await Promise.all(checkpoints.map(cp => newRaid[0].addCheckpoint(cp)));
    //Get an array of the new checkpoints bound to their parent raid.
    const checkpointsUpdatedWithRaids = await Checkpoint.findAll({
      where: { raidId: newRaid[0].id },
    });

    //Loop through each checkpoint...
    for (let i = 0; i < checkpointsUpdatedWithRaids.length; i++) {
      let cp = checkpointsUpdatedWithRaids[i];

      //For each checkpoint, find or create the character in the attendance of that checkpoint.
      //Makes sure all characters already exist in the database.
      await Promise.all(
        attendance[cp.checkpointName].map(
          char => Character.findOrCreate({ where: { characterName: char } })[0]
        )
      );
      allCharactersOfTheNight.push(...attendance[cp.checkpointName]);
      console.log("-----------------------------");

      //Get an array of characters corresponding to the attendance log.
      let attendingChars = await Character.findAll({
        where: {
          characterName: {
            [Op.in]: attendance[checkpointsUpdatedWithRaids[i].checkpointName],
          },
        },
      });

      //For each checkpoint, add the associated users to the checkpoint.
      console.log(
        "about to set",
        checkpointsUpdatedWithRaids[i].checkpointName
      );
      await checkpointsUpdatedWithRaids[i].setCharacters(attendingChars);
      console.log(`${attendingChars.length} characters ${chalk.bold(`set!`)}`);
    }
    allCharactersOfTheNight = new Set(allCharactersOfTheNight);
    allCharactersOfTheNight = [...allCharactersOfTheNight];
    const charSetButNotASet = await Character.findAll({
      where: {
        characterName: {
          [Op.in]: allCharactersOfTheNight,
        },
      },
    });

    console.log(chalk.green("preparing to set up items"));
    //Create each item. Not findOrCreate; we want separate instances of an item.
    // const items = await Promise.all(
    //   itemsObjArr.map(item =>
    //     Item.create({ itemName: item.itemName, itemDKPCost: item.itemDKPCost })
    //   )
    // );
    // console.log(itemsObjArr);
    // console.log(chalk.blue(`${items.length} items created`));
    // await Promise.all(
    //   items.map(item => {
    //     item.setRaidAcquired(newRaid[0]);
    //   })
    // );
    // console.log(
    //   chalk.blue(
    //     `${items.length} items set to ${chalk.yellow(newRaid[0].raidName)}`
    //   )
    // );
    // console.log(
    //   charSetButNotASet.find(char => char.characterName === "Goliath")
    // );
    // console.log(items[0]);

    for (let i = 0; i < itemsObjArr.length; i++) {
      let item = await Item.create({
        itemName: itemsObjArr[i].itemName,
        itemDKPCost: itemsObjArr[i].itemDKPCost,
      });
      await item.setRaidAcquired(newRaid[0]);
      let char = await Character.findOne({
        where: { characterName: itemsObjArr[i].characterName },
      });
      await newRaid[0].addItem(item);
      await item.setCharacter(char);
    }
    console.log("all done?!");
  } catch (e) {
    console.log(e);
  }
}
