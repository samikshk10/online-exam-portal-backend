import * as Sequelize from "sequelize";
import { ModelTimestampExtend } from ".";

export interface InputUserInterface {
  sub?: string;
  name?: string;
}

export interface UserInterface extends ModelTimestampExtend, InputUserInterface {
  id: Sequelize.CreationOptional<number>;
  ownerId?: number;
}

export interface UserModelInterface
  extends Sequelize.Model<UserInterface, Partial<InputUserInterface>>,
    UserInterface {}
