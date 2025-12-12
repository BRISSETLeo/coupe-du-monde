// Shared helpers for managing in-memory user balances (reset on service restart)
const userBalances = new Map();

const normalizeAmount = (value) => {
    const amount = Number(value);
    if (!Number.isFinite(amount) || amount <= 0) {
        return null;
    }
    return Math.round(amount * 100) / 100;
};

const getBalance = (userId) => userBalances.get(userId) || 0;

const setBalance = (userId, balance) => {
    const rounded = Math.round(balance * 100) / 100;
    userBalances.set(userId, rounded);
    return rounded;
};

module.exports = {
    normalizeAmount,
    getBalance,
    setBalance,
};
