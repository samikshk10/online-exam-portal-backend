"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("codequestions", "difficulty", {
      type: Sequelize.ENUM("EASY", "MEDIUM", "HARD"),
      defaultValue: "EASY",
      allowNull: false,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("codequestions", "difficulty");
  },
};
