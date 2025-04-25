const crypto = require('crypto');

function generateHash(data) {
  const hash = crypto.createHash('sha256');
  hash.update(JSON.stringify(data));
  return hash.digest('hex');
}

function isTransactionSuspicious(transaction) {
  // Example: Check if transaction amount is unusually high
  const MAX_AMOUNT = 100000; // Adjust this limit as needed
  if (transaction.amount > MAX_AMOUNT) {
    return true;
  }

  // Example: Check if transaction is from an unusual location
  const SUSPICIOUS_LOCATIONS = ['CountryX', 'CountryY']; // Replace with actual suspicious locations
  if (SUSPICIOUS_LOCATIONS.includes(transaction.location)) {
    return true;
  }

    // Example: Check if the transaction time is outside of normal hours
    const currentHour = new Date().getHours();
    if (currentHour < 6 || currentHour > 22) {
        return true;
    }
  
  // Example: Check if transaction history indicates unusual behavior
    if (transaction.previousTransactions && transaction.previousTransactions.length > 5) {
        const averageAmount = transaction.previousTransactions.reduce((sum, prev) => sum + prev.amount, 0) / transaction.previousTransactions.length;
        if (transaction.amount > averageAmount * 2) {
            return true;
        }
    }

  return false;
}

function logSuspiciousTransaction(transaction) {
  const hash = generateHash(transaction);
  console.warn(`Suspicious transaction detected: ${JSON.stringify(transaction)}`);
  console.warn(`Transaction hash: ${hash}`);
  // Additional logging or notification logic can be added here
}

function handleTransaction(transaction) {
  if (isTransactionSuspicious(transaction)) {
    logSuspiciousTransaction(transaction);
    // Logic to block the transaction or flag for review can be added here
    return false; // Indicate that the transaction was blocked
  }
  return true; // Indicate that the transaction was successful
}

module.exports = {
  generateHash,
  isTransactionSuspicious,
  logSuspiciousTransaction,
  handleTransaction
};