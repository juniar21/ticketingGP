export interface IUser {
    id : number, 
    email : string,
    password :string,
    username : string,
    referral : string,
    referredBy : string,
    fullname : string,
    Avatar : string,
    
}

export interface IVoucher {
    idVoucher : number,
    percentage : number,
    userId : number,
    user : IUser
}

export interface IPoin {
    idPoin : number,
    amount : number,
    userId : number,
    user : IUser
}

export interface IEvent {
    idEvent : string,
    title : string,
    category : string,
    location : string,
    circuit : string,
    startTime : string,
    endTime : string,
    date : string,
    image : string
    tickets: ITicket[]
}

export interface ITicket {
    idTicket : string,
    eventId : string,
    price : number,
    quota : number,
    category : string,
    event : IEvent
}

export interface IOrder {
    idOrder : string,
    ticketId : string,
    quantity : number,
    amount : number,
    status : string,
    invoiceURL : string,
    ticket : ITicket
}