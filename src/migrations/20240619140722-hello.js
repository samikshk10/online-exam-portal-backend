// this is the demo migration

"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("upload_medias", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("upload_medias");
  },
};
