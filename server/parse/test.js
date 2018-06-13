const fs = require("fs");

//on a trimmed line, slice 27 to get rid of the time/date/whatever header

fs.readFile(
  process.env.SHELL === "C:\\Program Files\\Git\\usr\\bin\\bash.exe"
    ? "D:\\Users\\Public\\Daybreak Game Company\\Installed Games\\EverQuest\\Logs\\eqlog_Goliath_coirnav.txt"
    : "./test.txt",
  "utf8",
  (err, data) => {
    try {
      const processedArray = splitThenTrimThenSlice(data);
      let checkpointNames = findCheckpointNames(processedArray);
      const attendance = {};
      checkpointNames.forEach(
        name => (attendance[name] = renderAttendance(processedArray, name))
      );
      let itemDrops = findItemDrops(processedArray);
      let items = itemDrops.map(drop => parseItemDrop(drop));
      // console.log(findDummyRaidName(processedArray));
      // console.log(findRaidStartAndEnd(processedArray))
      // console.log(items);
      // console.log(attendance);
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
  // console.log(output);
  return output;
}

function findCheckpointNames(processedArr) {
  const output = [];
  for (let i = 0; i < processedArr.length; i++) {
    if (processedArr[i].includes("BEGIN")) {
      output.push(processedArr[i].split(" ")[4]);
    }
  }
  // console.log(output);
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
  return output;
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
