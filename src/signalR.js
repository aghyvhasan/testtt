import { HubConnectionBuilder } from '@microsoft/signalr';

const connection = new HubConnectionBuilder()
    .withUrl('https://localhost:7246/signalRHub') // Replace with your SignalR endpoint URL
    .build();

export default connection;