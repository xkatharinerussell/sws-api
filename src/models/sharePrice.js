// Local Imports
import database from "../database/database.js";

// Destructure Sequelize vars
const { Sequelize, db } = database;
const { DataTypes } = Sequelize;

const SharePrice = db.define('swsCompanyPriceClose', {
  // Model attributes
  companyId: {
    field: 'company_id', // Database field name to associate with
    primaryKey: true,
    type: DataTypes.STRING
  },
  date: {
    type: DataTypes.DATEONLY,
    primaryKey: true,
  },
  price: { 
    type: DataTypes.FLOAT
  },
  dateCreated: { 
    field: 'date_created',
    type: DataTypes.DATE
  }
}, {
  freezeTableName: true,
  timestamps: false
});

export default SharePrice;