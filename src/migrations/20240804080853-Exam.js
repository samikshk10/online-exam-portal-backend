// this is the demo migration

"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("exams", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      exam_title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      exam_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      has_code_questions: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      mcq_question_marks: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      code_question_easy_marks: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      code_question_medium_hard_marks: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      total_marks: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("users");
  },
};
