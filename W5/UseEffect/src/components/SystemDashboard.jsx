import { useEffect, useState } from "react";

function SystemDashboard() {
    const [cpu, setCpu] = useState(0);
    const [memory, setMemory] = useState(0);
    const [network, setNetwork] = useState(0);

    useEffect(() => {
        const cpuInterval = setInterval(() => {
            const usage = Math.floor(Math.random() * 100);
            setCpu(usage);
            if (usage > 80) alert("⚠️ CPU usage too high!");
        }, 2000);

        return () => {
            clearInterval(cpuInterval);
            console.log("🧹 CPU monitor stopped.");
        };
    }, []);

    useEffect(() => {
        const memoryInterval = setInterval(() => {
            const usage = Math.floor(Math.random() * 100);
            setMemory(usage);
        }, 2500);

        return () => {
            clearInterval(memoryInterval);
            console.log("🧹 Memory monitor stopped.");
        };
    }, []);

    useEffect(() => {
        const networkInterval = setInterval (() => {
            const usage = Math.floor(Math.random() * 100);
            setNetwork(usage);
            localStorage.setItem("networkUsage", usage);
        }, 3000);

        return () => {
            clearInterval(networkInterval);
            console.log("🧹 Memory monitor stopped.");
        };
    }, []);

    return (
        <div>
            <h2>System Monitor</h2>
            <p>CPU Usage: {cpu}%</p>
            <p>Memory Usage: {memory}%</p>
            <p>Network Usage: {network}%</p>
        </div>
        );
    }

    export default SystemDashboard;