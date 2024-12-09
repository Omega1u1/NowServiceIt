import './App.css';
import { createTicketAPI, ticketFetchAPI, ticketUpdateAPI, deleteTicketAPI } from './service/ticketingServicing';
import { useEffect, useState } from 'react';
import TicketSubmission from './components/ticketformsubmission/ticketSubmission';
import { formatDate } from './utility/dateUtil';

const App = () => { // State variables to manage the list of tickets and the currently selected ticket
  const [tickets, setTickets] = useState([]);
  const [ticketCurrent, setTicketCurrent] = useState({});

  // Function to fetch all tickets from the API
  const getTickets = async()=>{
    setTickets(await ticketFetchAPI()); 
  };
  // Function to create or update a ticket
  const createSaveRequest = async(
      id,
      name, 
      subject,
      description,
      category,
      impact,
      priority,
      urgency,
      status,
      technician,
      create_date // Date object representing the creation/update date
    ) => { const ticketingNew = { // Construct the ticket object to be sent to the API
        id,
        name, 
        subject,
        description,
        category,
        impact,
        priority,
        urgency,
        status,
        technician,
        Time_submitted: formatDate(new Date(create_date)), // Format the date
    };

    const ticketSaved = id?await ticketUpdateAPI(id, ticketingNew):await createTicketAPI(ticketingNew);
      // Call the appropriate API function based on whether it's a new ticket or an update

    if (!ticketSaved) {return; } // Handle API error (could be improved with more specific error handling)

    ticketFetchAPI();
    setTicketCurrent(ticketSaved); 
  }; 
    const ticketDelete =async(ticket)=>{
      if (!ticket?.id){return; }  // Don't try to delete if there's no ID
      const ticketResult = await deleteTicketAPI(ticket.id);
      if (!ticketResult){return; } // Handle API error
      getTickets(); 
      setTicketCurrent({});
       // Refresh the ticket list and clear the currently selected ticket
    };

  useEffect(() => {getTickets(); },[]); // Fetch tickets on component mount

  return (
    <div className="App">
    <h1>NowServiceIt</h1>
    <TicketSubmission
      id={ticketCurrent.id}
      name={ticketCurrent.name}
      subject={ticketCurrent.subject}
      description={ticketCurrent.description}
      category={ticketCurrent.category}
      impact={ticketCurrent.impact}
      priority={ticketCurrent.priority}
      urgency={ticketCurrent.urgency}
      technician={ticketCurrent.technician}
      status={ticketCurrent.status}
      createDate={ticketCurrent.createDate ? new Date(ticketCurrent.createDate) : new Date}
      readonly = {false} 
      onSubmit = {createSaveRequest}
    />
    <h2>Tickets</h2>
    {tickets.map((ticket, index) => (
      <div key={index} onClick={() => setTicketCurrent(ticket)} style={{ border: "3px solid black" }}>
      <p>Ticket ID: {ticket.id}</p>
      <p>User: {ticket.name}</p>
      <p>Subject: {ticket.subject}</p>
      <p>Description: {ticket.description}</p>
      <p>Category: {ticket.category}</p>
      <p>Impact: {ticket.impact}</p>
      <p>Priority: {ticket.priority}</p>
      <p>Urgency: {ticket.urgency}</p>
      <p>Technician: {ticket.technician}</p>
      <p>Ticket Status: {ticket.Status}</p>
      <p>Last Updated: {ticket.Time_submitted}</p>
      <button onClick={() => ticketDelete(ticket)}> Delete Ticket</button>
      </div>
    ))}
    </div>
  );
}
export default App;
