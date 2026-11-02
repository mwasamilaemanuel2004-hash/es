import BrokerConnect from '@/components/broker-connect';

const Dashboard = observer(() => {
    const { ui } = useStore();
    const { isAuthorized } = ui;
    return (
        <div style={{ paddingTop: '12px' }}>
            <div>Dashboard observing from mobx store.</div>
            <div>isAuthorized: {isAuthorized.toString()}</div>

            <BrokerConnect />
        </div>
    );
});

export default Dashboard;
