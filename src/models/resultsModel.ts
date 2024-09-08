import * as Sequelize from "sequelize";
import Exams from "./exam";
import User from "./user";
import { Database } from "../config";

const sequelize = Database.sequelize;

const Results = sequelize.define(
  "results",
  {
    id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    fullScreenCount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    highNoiseCount: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    outOfViewCount: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    attemptedQuestionCount: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    obtainedMarks: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
    totalMarks: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
    examId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "exams",
        key: "id",
      },
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
  }
);
User.hasMany(Results, { foreignKey: "userId", as: "users" });

Results.belongsTo(User, { foreignKey: "userId" });

Exams.hasMany(Results, { foreignKey: "userId", as: "exams" });

Results.belongsTo(Exams, { foreignKey: "examId" });

export default Results;
