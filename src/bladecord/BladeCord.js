// Michael Trinh
// BladeCord

"use strict";

const BladeCordController = require("./controllers/BladeCordController");
const BladeCordCommandListener = require("./listeners/BladeCordCommandListener");
const BladeCordListener = require("./listeners/BladeCordListener");

startBladeCord();

/**
 * Starts the Bot
 */
function startBladeCord() {
  BladeCordController.login();
  BladeCordListener.start();
  BladeCordCommandListener.start();
}