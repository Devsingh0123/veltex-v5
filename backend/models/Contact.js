import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js'; // .js extension zaroori hai ESM mein

const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  service: {
    type: DataTypes.STRING,
    defaultValue: 'Not specified'
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'contact_submissions',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false // Ise false kar dein agar table mein ye column nahi hai
});

export default Contact;
