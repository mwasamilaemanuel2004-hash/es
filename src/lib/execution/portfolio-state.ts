export type PortfolioMode = 'LIVE' | 'PAPER' | 'BACKTEST';

export interface PortfolioState {
    equity: number;
    balance: number;
    freeMargin: number;
    unrealizedPnl: number;
    realizedPnl: number;
    mode: PortfolioMode;
    positionCount: number;
    drawdownPercent: number;
    exposurePercent: number;
}

export interface PortfolioSummary {
    mode: PortfolioMode;
    equity: number;
    balance: number;
    freeMargin: number;
    unrealizedPnl: number;
    realizedPnl: number;
    positionCount: number;
    drawdownPercent: number;
    exposurePercent: number;
    status: 'STABLE' | 'WARNING' | 'CRITICAL';
}

export const summarizePortfolio = (state: PortfolioState): PortfolioSummary => {
    const status: PortfolioSummary['status'] =
        state.drawdownPercent >= 12 || state.exposurePercent >= 25
            ? 'CRITICAL'
            : state.drawdownPercent >= 8 || state.exposurePercent >= 18
              ? 'WARNING'
              : 'STABLE';

    return {
        mode: state.mode,
        equity: state.equity,
        balance: state.balance,
        freeMargin: state.freeMargin,
        unrealizedPnl: state.unrealizedPnl,
        realizedPnl: state.realizedPnl,
        positionCount: state.positionCount,
        drawdownPercent: state.drawdownPercent,
        exposurePercent: state.exposurePercent,
        status,
    };
};

export const createPortfolioSnapshot = (
    equity: number,
    balance: number,
    freeMargin: number,
    unrealizedPnl: number,
    realizedPnl: number,
    mode: PortfolioMode,
    positionCount: number,
    drawdownPercent: number,
    exposurePercent: number
): PortfolioSummary =>
    summarizePortfolio({
        equity,
        balance,
        freeMargin,
        unrealizedPnl,
        realizedPnl,
        mode,
        positionCount,
        drawdownPercent,
        exposurePercent,
    });
