export const dashboardData = {
    expenseStats: [
        { name: "Entertainment", value: 30, color: "#fc7900" },
        { name: "Bill Expense", value: 15, color: "#ffbb38" },
        { name: "Investment", value: 20, color: "#fa00ff" },
        { name: "Others", value: 35, color: "#1814f3" },
    ],
    balanceHistory: [
        { month: "Jul", balance: 200 },
        { month: "Aug", balance: 400 },
        { month: "Sep", balance: 300 },
        { month: "Oct", balance: 700 },
        { month: "Nov", balance: 400 },
        { month: "Dec", balance: 600 },
        { month: "Jan", balance: 500 },
    ],
};

export const creditCardsData = {
    expenseStats: [
        { name: "DBL Bank", value: 35, color: "#1814f3" },
        { name: "BRC Bank", value: 25, color: "#fc7900" },
        { name: "ABM Bank", value: 20, color: "#ffbb38" },
        { name: "MCP Bank", value: 20, color: "#ff82ac" },
    ],
};

export const investmentsData = {
    stats: {
        totalInvested: 150000,
        numberOfInvestments: 1250,
        rateOfReturn: 5.8,
    },
    yearlyData: [
        { year: "2016", value: 5000 },
        { year: "2017", value: 25000 },
        { year: "2018", value: 15000 },
        { year: "2019", value: 40000 },
        { year: "2020", value: 20000 },
        { year: "2021", value: 30000 },
    ],
    monthlyRevenue: [
        { month: "2016", value: 10000 },
        { month: "2017", value: 15000 },
        { month: "2018", value: 25000 },
        { month: "2019", value: 30000 },
        { month: "2020", value: 20000 },
        { month: "2021", value: 35000 },
    ],
    myInvestments: [
        {
            id: 1,
            name: "Apple",
            category: "E-commerce, Marketplace",
            investmentValue: 54000,
            returnValue: 16,
            icon: "apple",
            color: "rgb(var(--color-destructive))",
        },
        {
            id: 2,
            name: "Samsung",
            category: "E-commerce, Marketplace",
            investmentValue: 25300,
            returnValue: -4,
            icon: "samsung",
            color: "rgb(var(--color-accent))",
        },
        {
            id: 3,
            name: "Tesla",
            category: "Electric Vehicles",
            investmentValue: 8200,
            returnValue: 25,
            icon: "tesla",
            color: "rgb(var(--color-warning))",
        },
    ],
    trendingStocks: [
        { sl: 1, name: "Trivago", price: 520, returnValue: 5 },
        { sl: 2, name: "Canon", price: 480, returnValue: 10 },
        { sl: 3, name: "Uber Food", price: 350, returnValue: -3 },
        { sl: 4, name: "Nokia", price: 940, returnValue: 2 },
        { sl: 5, name: "Tiktok", price: 670, returnValue: -12 },
    ],
};

export const transactionsData = [
    {
        id: "tx_1",
        description: "Spotify Subscription",
        transactionId: "#12548796",
        type: "Shopping",
        card: "**** 1234",
        date: "28 Jan, 12:30 AM",
        amount: -2500,
        receipt: "download",
    },
    {
        id: "tx_2",
        description: "Mobile Service",
        transactionId: "#12548795",
        type: "Service",
        card: "**** 1234",
        date: "28 Jan, 10:40 PM",
        amount: -150,
        receipt: "download",
    },
    {
        id: "tx_3",
        description: "Emilly Wilson",
        transactionId: "#12548794",
        type: "Transfer",
        card: "**** 1234",
        date: "28 Jan, 09:00 PM",
        amount: 780,
        receipt: "download",
    },
];

export const accountsData = [
    {
        id: "acc_1",
        name: "My Balance",
        balance: 12750,
        type: "checking",
        accountNumber: "**** **** 1234",
    },
    {
        id: "acc_2",
        name: "Income",
        balance: 5600,
        type: "income",
        accountNumber: "**** **** 5678",
    },
    {
        id: "acc_3",
        name: "Expense",
        balance: 3460,
        type: "expense",
        accountNumber: "**** **** 9012",
    },
    {
        id: "acc_4",
        name: "Total Saving",
        balance: 7920,
        type: "savings",
        accountNumber: "**** **** 3456",
    },
];

export const loansData = {
    activeLoans: [
        {
            id: "loan_1",
            type: "Personal Loan",
            amount: 100000,
            loanId: "LD12345678",
            leftToRepay: 40500,
            duration: "8 Months",
            interestRate: 12,
            installment: 5000,
        },
        {
            id: "loan_2",
            type: "Corporate Loan",
            amount: 500000,
            loanId: "LD87654321",
            leftToRepay: 250000,
            duration: "2 Years",
            interestRate: 10,
            installment: 15000,
        },
    ],
    totalLoans: 625000,
    totalRepaid: 334500,
};

export const servicesData = [
    {
        id: "service_1",
        name: "Life Insurance",
        description: "Unlimited protection",
        icon: "shield",
        color: "rgb(var(--color-secondary) / 0.1)",
    },
    {
        id: "service_2",
        name: "Shopping",
        description: "Buy. Think. Grow.",
        icon: "shopping",
        color: "rgb(var(--color-warning) / 0.2)",
    },
    {
        id: "service_3",
        name: "Safety",
        description: "We are your allies",
        icon: "safety",
        color: "rgb(var(--color-destructive) / 0.15)",
    },
];

export const settingsData = {
    profile: {
        name: "Charlene Reed",
        username: "charlenereed",
        email: "charlenereed@gmail.com",
        password: "**********",
        dateOfBirth: "25 January 1990",
        presentAddress: "San Jose, California, USA",
        permanentAddress: "San Jose, California, USA",
        city: "San Jose",
        postalCode: "45962",
        country: "USA",
        avatar: "/avatars/profile.jpg",
    },
    preferences: {
        currency: "USD",
        timeZone: "GMT-8",
        notifications: true,
        twoFactorAuth: false,
    },
};

export const privilegesData = [
    {
        id: "priv_1",
        name: "Premium Rewards",
        description:
            "Earn points on every transaction and redeem for exclusive rewards",
        icon: "award",
        status: "active" as const,
        benefits: [
            "5% cashback on all purchases",
            "Double points on travel bookings",
            "Priority customer support",
            "Annual bonus rewards",
        ],
    },
    {
        id: "priv_2",
        name: "Travel Benefits",
        description:
            "Exclusive travel perks and airport lounge access worldwide",
        icon: "zap",
        status: "active" as const,
        benefits: [
            "Free airport lounge access",
            "Travel insurance coverage",
            "No foreign transaction fees",
            "Hotel upgrade benefits",
        ],
    },
    {
        id: "priv_3",
        name: "VIP Banking",
        description:
            "Premium banking services with dedicated relationship manager",
        icon: "star",
        status: "inactive" as const,
        benefits: [
            "Dedicated relationship manager",
            "Priority service at branches",
            "Exclusive investment opportunities",
            "Waived account fees",
        ],
    },
    {
        id: "priv_4",
        name: "Lifestyle Perks",
        description:
            "Access to exclusive events, dining, and entertainment experiences",
        icon: "gift",
        status: "coming-soon" as const,
        benefits: [
            "Exclusive event invitations",
            "Restaurant reservation service",
            "Concert and show tickets",
            "Luxury brand partnerships",
        ],
    },
];
