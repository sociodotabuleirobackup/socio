import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

const API_URL = 'http://localhost:3000/transactions'; // Update with your API URL
const FRAUD_SCORE_THRESHOLD = 80;

export async function checkTransactionFraud(transactionData) {
  try {
    // Send POST request to the anti-fraud API
    const response = await axios.post(API_URL, [transactionData], {
      headers: { 'Content-Type': 'application/json' }
    });

    // Extract the fraud score from the response
    const result = response.data[0]; // Assuming single transaction
    const fraudScore = result.score;

    // Decide based on the score
    if (fraudScore > FRAUD_SCORE_THRESHOLD) {
      return {
        approved: false,
        message: `Transaction rejected: High fraud risk (score: ${fraudScore})`
      };
    } else {
      return {
        approved: true,
        message: `Transaction approved (score: ${fraudScore})`
      };
    }
  } catch (error) {
    console.error('Error contacting anti-fraud API:', error.message);
    return {
      approved: false,
      message: 'Error checking transaction for fraud. Please try again.'
    };
  }
}

export function calculateAge(birthDate) {
	const today = new Date();
	const birth = new Date(birthDate);
	let age = today.getFullYear() - birth.getFullYear();
	const monthDiff = today.getMonth() - birth.getMonth();
	if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
	age--;
	}
	return age;
	}
