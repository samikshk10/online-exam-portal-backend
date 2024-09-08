import * as Sequelize from "sequelize";
import { Database } from "../config";

const sequelize = Database.sequelize;

const User = sequelize.define(
  "users",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    fullName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    status: {
      type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
      allowNull: false,
      defaultValue: "ACTIVE",
    },
    role: {
      type: Sequelize.ENUM("ADMIN", "USER"),
      allowNull: false,
      defaultValue: "USER",
    },
  },
  {
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
  }
);

export default User;
