"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("exams", "start_time", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("exams", "end_time", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("exams", "start_date", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("exams", "end_date", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("exams", "start_time");
    await queryInterface.removeColumn("exams", "end_time");
    await queryInterface.removeColumn("exams", "start_date");
    await queryInterface.removeColumn("exams", "end_date");
  },
};
