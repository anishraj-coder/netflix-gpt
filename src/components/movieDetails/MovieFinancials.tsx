interface MovieFinancialsProps {
    director?: { name: string };
    budget?: number;
    revenue?: number;
}

const MovieFinancials = ({ director, budget, revenue }: MovieFinancialsProps) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 font-[poppins]">
            {director && (
                <div>
                    <h3 className="text-gray-400 text-sm">Director</h3>
                    <p className="font-medium">{director.name}</p>
                </div>
            )}
            {budget && budget > 0 && (
                <div>
                    <h3 className="text-gray-400 text-sm">Budget</h3>
                    <p className="font-medium">{formatCurrency(budget)}</p>
                </div>
            )}
            {revenue && revenue > 0 && (
                <div>
                    <h3 className="text-gray-400 text-sm">Revenue</h3>
                    <p className="font-medium">{formatCurrency(revenue)}</p>
                </div>
            )}
        </div>
    );
};

export default MovieFinancials;