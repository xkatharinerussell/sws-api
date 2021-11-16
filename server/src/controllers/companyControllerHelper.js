import { subDays } from 'date-fns';

/* Helper functions for Company controller */

// Calculate details related to pagination
export const getPagingData = (totalCompanies, limit, page) => {
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalCompanies / limit) ?? 1;
    return { currentPage, totalPages };
}

// Get most recent company share price by date
export const getLastSharePrice = (company) => {
    company.swsCompanyPriceCloses.sort((a, b) => {
        // Sort all dates by least to most recent
        return new Date(a.date) - new Date(b.date);
    });
    // Return most recent price
    const last = company.swsCompanyPriceCloses.length - 1;
    return company.swsCompanyPriceCloses[last].dataValues.price;
}

// Calculate the price volatility in last 90 days. Volatility measures the amount of uncertainty/risk related to stock price.
export const ninetyDayVolatility = (company) => {
    // Hardcode a date as the end of 90 day period.
    // Note: this is only for the purpose of the challenge as data is from 2020. Actual implmentation should use the date from today.
    const endDate = new Date('2020-07-01');
    const startDate = subDays(endDate, 90);
    // Create array with prices from the last 90 days
    const lastNinetyDayPrices = company.swsCompanyPriceCloses.filter((item) => new Date(item.date) >= startDate && new Date(item.date) <= endDate);
    // Keep track of how many prices 
    const pricesLen = lastNinetyDayPrices.length;
    // Get sum of all closing prices
    const priceCloseSum = lastNinetyDayPrices.map((item) => item.price).reduce((a, b) => a + b);
    // Find mean of closing prices
    const mean = priceCloseSum / pricesLen;
    // Calculate difference between each price and mean (deviation) then square them
    // Add squared deviations together and divide by number of prices 
    const volatility = Math.sqrt(lastNinetyDayPrices.map(p => Math.pow(p.price - mean, 2)).reduce((a, b) => a + b) / pricesLen);
    return roundToTwo(volatility);
}

// Round a float to 2 decimal places
const roundToTwo = (num) => {
    return +(Math.round(num + "e+2") + "e-2");
}