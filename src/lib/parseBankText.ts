// lib/parseBankText.ts

export type Transaction = {
  date: string;
  description: string;
  amount: number;
};

export function extractTransactions(text: string): Transaction[] {
  const lines = text.split("\n");
  const transactions: Transaction[] = [];

  const transactionRegex =
    /^(\d{2}\/\d{2}\/\d{4})\s+(.+?)\s+(-?\$?\d{1,3}(?:,\d{3})*(?:\.\d{2})?)$/;

  for (const line of lines) {
    const match = line.match(transactionRegex);
    if (match) {
      const [_, date, description, amountStr] = match;
      const amount = parseFloat(amountStr.replace(/[^0-9.-]+/g, ""));
      transactions.push({ date, description, amount });
    }
  }

  return transactions;
}
