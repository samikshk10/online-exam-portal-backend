"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("results", {
      id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      full_screen_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      high_noise_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      out_of_view_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      attempted_question_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      total_question_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      obtained_marks: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      total_marks: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      exam_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "exams",
          key: "id",
        },
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
    await queryInterface.dropTable("results");
  },
};
