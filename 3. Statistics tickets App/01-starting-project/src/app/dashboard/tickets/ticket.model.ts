export interface  Ticket{
    id: string;
    request: string;
    title: string;
    status: 'open' | 'closed';
}