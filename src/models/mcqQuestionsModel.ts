import * as Sequelize from "sequelize";

import { Database } from "../config";

const sequelize = Database.sequelize;

const MCQQuestion = sequelize.define(
  "mcqquestions",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    question: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    options: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },
    correctAnswer: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING,
      defaultValue: "mcq",
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
  }
);

export default MCQQuestion;
