import * as Sequelize from "sequelize";

import { Database } from "../config";

const sequelize = Database.sequelize;

const CodeQuestion = sequelize.define(
  "codequestions",
  {
    id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    question: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    difficulty: {
      type: Sequelize.ENUM("EASY", "MEDIUM", "HARD"),
      defaultValue: "EASY",
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING,
      defaultValue: "code",
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

export default CodeQuestion;
