const App_Root_URL = "http://localhost:3001"; // Retrieves the base URL of the backend API from environment variables

// Function to fetch all tickets
export const ticketFetchAPI = async()=>{ const rawResponse = await fetch (`${App_Root_URL}/all`, {mode: 'cors'});
// Fetches data from the /all endpoint of the API.
    return await rawResponse.json(); // Parses the response body as JSON and returns it
};

// Function to fetch a specific ticket by ID
export const getTicketAPI = async (id)=>{ const rawResponse = await fetch (`${App_Root_URL}/ticket/${id}`, {mode: 'cors'});
// Fetches data from the /ticket/:id endpoint
    return await rawResponse.json(); 
};

// Function to create a new ticket
export const createTicketAPI = async (ticket)=>{ const rawResponse = await fetch (`${App_Root_URL}/ticket`, {
    method:"POST", // Uses POST method to create a new ticket by POST function in the database
    headers:{ "Content-Type": "application/json", // Sets content type to JSON
    Accept:"application/json", }, // Sets accepted response type to JSON
    body: JSON.stringify(ticket), // Converts the ticket object to a JSON string for the request body
  });   if (rawResponse.status !== 200) { // Checks if the request was successful.
             console.error("Ticket could not be created."); // Logs an error if the request failed
        return null; // Returns null if the request failed(no value)
    } return await rawResponse.json(); 
};

// Function to update an existing ticket
export const ticketUpdateAPI = async (id, ticket) => {
    if (ticket.id) { delete ticket.id; }  // Removes the id property from the ticket object before sending the request
    const rawResponse = await fetch(`${App_Root_URL}/ticket/${id}`, {
    method: "PUT", // Uses PUT method to update the ticket to PUT updated entries into existing entry
    headers: { "Content-Type": "application/json",
    Accept: "application/json", },
    body: JSON.stringify(ticket),
});     if (rawResponse.status !== 200) {
            console.error("Ticket could not be updated.");
        return null;
    } return await rawResponse.json();
};

// Function to delete a ticket
export const deleteTicketAPI = async (id) => {
    const rawResponse = await fetch (`${App_Root_URL}/ticket/${id}`, {
    method: "DELETE", // Uses DELETE method to delete the ticket and remove its entry
    headers: {"Content-Type": "application/json",
    Accept: "application/json", },
});     if (rawResponse.status !== 200) {
      console.error("Ticket could not be deleted.");
      return null;
    } return await rawResponse.json();
};