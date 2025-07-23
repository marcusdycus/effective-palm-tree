import type {
  ParsedStatement,
  ParsedExpense,
} from "@/components/pdf-import-dialog";

const CATEGORY_KEYWORDS: { [key: string]: string[] } = {
  "Food & Dining": ["restaurant", "cafe", "food", "dining", "starbucks", "grubhub"],
  "Transportation": ["uber", "lyft", "gas", "transport", "subway"],
  "Shopping": ["amazon", "target", "walmart", "store", "shop"],
  "Bills & Utilities": ["verizon", "comcast", "utility", "electric", "internet"],
  "Entertainment": ["netflix", "spotify", "hulu", "cinema", "tickets"],
  "Healthcare": ["pharmacy", "doctor", "cvs", "walgreens"],
  "Housing": ["rent", "mortgage"],
};

function categorizeExpense(description: string): string {
  const lowerDescription = description.toLowerCase();
  for (const category in CATEGORY_KEYWORDS) {
    for (const keyword of CATEGORY_KEYWORDS[category]) {
      if (lowerDescription.includes(keyword)) {
        return category;
      }
    }
  }
  return "Other";
}

export function parseFinancialText(text: string): ParsedStatement {
  const expenses: ParsedExpense[] = [];
  const transactionRegex = /\b(\d{1,2}\/\d{1,2}(?:\/\d{2,4})?)\b([\s\S]*?)\b([\d,]+\.\d{2})\b/g;

  let match;
  while ((match = transactionRegex.exec(text)) !== null) {
    const description = match[2].trim().replace(/\s+/g, ' ');
    if (description.length > 3 && description.length < 100 && !description.toLowerCase().includes('payment')) {
      expenses.push({
        id: crypto.randomUUID(),
        date: match[1],
        description: description,
        amount: parseFloat(match[3].replace(/,/g, "")),
        category: categorizeExpense(description),
      });
    }
  }

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const categories = expenses.reduce((acc, exp) => {
    if (!acc[exp.category]) {
      acc[exp.category] = { total: 0, count: 0, percentage: 0 };
    }
    acc[exp.category].total += exp.amount;
    acc[exp.category].count += 1;
    return acc;
  }, {} as ParsedStatement['categories']);

  for(const category in categories) {
      categories[category].percentage = (categories[category].total / totalExpenses) * 100;
  }

  return {
    accountName: "Imported Statement",
    statementPeriod: "N/A",
    totalIncome: 0,
    totalExpenses: totalExpenses,
    netCashFlow: -totalExpenses,
    expenses: expenses,
    categories: categories,
  };
}
