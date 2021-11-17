// Local Imports
import database from "../database/database.js";

// Destructure Sequelize vars
const { Sequelize, db } = database;
const { DataTypes } = Sequelize;

const Score = db.define('swsCompanyScore', {
  // Model attributes
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
  companyId: {
    field: 'company_id', // Database field name to associate with
    type: DataTypes.STRING
  },
  dateGenerated: {
    field: 'date_generated',
    type: DataTypes.DATE
  },
  dividend: { 
    type: DataTypes.INTEGER
  },
  future: { 
    type: DataTypes.INTEGER
  },
  health: { 
    type: DataTypes.INTEGER
  },
  management: { 
    type: DataTypes.INTEGER
  },
  past: { 
    type: DataTypes.INTEGER
  },
  value: { 
    type: DataTypes.INTEGER
  },
  total: { 
    type: DataTypes.INTEGER
  },
  sentence: { 
    type: DataTypes.STRING(1234)
  }
}, {
  freezeTableName: true,
  timestamps: false
});

export default Score;