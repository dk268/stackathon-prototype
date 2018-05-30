const { db, Character, Raid, Item, User } = require("./server/db/index.js");

const seed = async () => {
  await db.sync({ force: true });

  const picard = await User.create({
    email: `captain@picard.ufp`
  });

  async function createCharacter(
    characterName,
    user = picard,
    dkp = 0,
    isAlt = false
  ) {
    const newChar = await Character.create({
      characterName,
      dkp,
      isAlt
    });
    await newChar.setUser(user);
    return newChar;
  }

  async function createItem(itemName, charactersArr) {
    const newItem = await Item.create({
      itemName
    });
    return newItem;
  }

  async function createRaid(raidName) {
    const newRaid = await Raid.create({
      raidName
    });
    return newRaid;
  }

  const Slamfist = await createCharacter("Slamfist", picard, 0, false);
  const truthSword1000 = await createItem("Sword of a Thousand Truths");
  await truthSword1000.addCharacter(Slamfist);
  const boarHunting = await createRaid("Boar Hunting");
  await boarHunting.addCharacter(Slamfist);
  await boarHunting.addItem(truthSword1000);

  db.close();
  console.log(` Seed successful~!
  Engage`);
};

seed().catch(err => {
  db.close();
  console.log(`
    Error seeding:
    ${err.message}
    ${err.stack}
  `);
});
