// Local Imports
import database from "../database/database.js";
import Score from "./score.js";
import SharePrice from "./sharePrice.js";

// Destructure Sequelize vars
const { Sequelize, db } = database;
const { DataTypes } = Sequelize;

const Company = db.define('swsCompany', {
  // Model attributes
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING
  },
  tickerSymbol: {
    field: 'ticker_symbol', // Database field name to associate with
    type: DataTypes.STRING
  },
  exchangeSymbol: {
    field: 'exchange_symbol',
    type: DataTypes.STRING
  },
  uniqueSymbol: {
    field: 'unique_symbol',
    type: DataTypes.STRING
  },
  dateGenerated: {
    field: 'date_generated',
    type: DataTypes.DATE
  },
  securityName: {
    field: 'security_name',
    type: DataTypes.STRING
  },
  exchangeCountryIso: {
    field: 'exchange_country_iso',
    type: DataTypes.STRING
  },
  listingCurrencyIso: {
    field: 'listing_currency_iso',
    type: DataTypes.STRING
  },
  canonicalUrl: {
    field: 'canonical_url',
    type: DataTypes.STRING(1234)
  },
  uniqueSymbolSlug: {
    field: 'unique_symbol_slug',
    type: DataTypes.STRING
  },
  scoreId: {
    field: 'score_id',
    type: DataTypes.STRING
  }
}, {
  freezeTableName: true,
  timestamps: false
});

// Define relationships
Company.hasOne(Score, {foreignKey: 'companyId'});
Company.hasMany(SharePrice, {foreignKey: 'companyId'});

export default Company;