import React, { Component } from "react";

export const initialAddCharacterState = {
  characterName: "",
  dkp: 0,
  isAlt: false,
  isAltUnapproved: false,
  class: "",
  totalDKPSpent: 0,
  totalDKPEarned: 0,
  overflowDKP: 0,
  raids: [],
  checkpoints: [],
  items: [],
};

export const initialAddCheckpointState = {
  checkpointName: "",
  checkpointDKP: 10,
  characters: [],
  raid: {},
};

export const initialAddItemState = {
  itemName: "",
  itemDKPCost: 0,
  itemLinkUrl: "",
  itemSmallImageUrl: "",
  itemStatBlockUrl: "",
  character: {},
  RaidAcquired: {},
};

export const initialAddRaidState = {
  raidName: "",
  checkpoints: [],
  items: [],
  characters: [],
};
