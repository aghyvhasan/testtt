import { HubConnectionBuilder } from '@microsoft/signalr';

const connection = new HubConnectionBuilder()
    .withUrl('https://cryptolotteryapi.azurewebsites.net/signalRHub') // Replace with your SignalR endpoint URL
    .build();

export default connection;