import * as Sequelize from "sequelize";
import Exams from "./exam";
import User from "./user";
import { Database } from "../config";

const sequelize = Database.sequelize;

const ExamSchedule = sequelize.define(
  "exam_schedules",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
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
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: false,
    underscored: true,
    freezeTableName: true,
  }
);

// ExamSchedule Exam Relation
Exams.hasMany(ExamSchedule, { foreignKey: "examId", as: "examSchedules" });

ExamSchedule.belongsTo(Exams, { foreignKey: "examId" });


// User Exam Schedule Relation
User.hasMany(ExamSchedule, { foreignKey: "userId", as: "examScheduleUser" });

ExamSchedule.belongsTo(User, { foreignKey: "userId" });

export default ExamSchedule;
