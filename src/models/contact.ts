import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database';

class ContactEntity extends Model {
  public id!: number;
  public phoneNumber?: string;
  public email?: string;
  public linkedId?: number;
  public linkPrecedence!: 'primary' | 'secondary';
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt?: Date;
}

ContactEntity.init(
  {
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    linkedId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    linkPrecedence: {
      type: DataTypes.ENUM('primary', 'secondary'),
      allowNull: false,
      defaultValue: 'primary'
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    },
    deletedAt: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize,
    modelName: 'Contact',
    timestamps: true,
    paranoid: true
  }
);

export default ContactEntity;
