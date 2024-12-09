import React, { useState, useEffect } from "react";
import "./ticketSubmission.css";
import { formatDate } from "../../utility/dateUtil";


function TicketSubmission({ // Component for creating and editing tickets
    id = "",
    name,
    subject,
    description,
    category,
    impact,
    priority,
    urgency,
    technician,
    status,
    createDate = new Date(),
    readonly = false,
    onSubmit = () => {},
    onClear = () => {},
}) {

    const [user, setName] = useState(name);
    const [ticketSubject, setTicketSubject] = useState(subject);
    const [ticketDescription, setTicketDescription] = useState(description);   
    const [ticketCategory, setTicketCategory] = useState(category);
    const [ticketImpact, setTicketImpact] = useState(impact);
    const [ticketPriority, setTicketPriority] = useState(priority);
    const [ticketUrgency, setTicketUrgency] = useState(urgency);
    const [ticketStatus, setTicketStatus] = useState(status);
    const [ticketTech, setTicketTech] = useState(technician);


    useEffect(() => {
        setName(name || "");
        setTicketSubject(subject || "");
        setTicketCategory(category || "Other");
        setTicketDescription(description || "");
        setTicketImpact(impact || "NORMAL");
        setTicketPriority(priority || "NORMAL");
        setTicketUrgency(urgency || "NORMAL");
        setTicketStatus(status || "Opened/In Progress");
        setTicketTech(technician || "");
      }, [id]); // The dependency array [id] ensures the effect runs when the ticket id changes
    
  

    return (<div className="TicketForm">
        <div className="form">
          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input type="number" value={id} name="id" disabled />
        </div>

        <div className="form-group">
            <label htmlFor="name">User</label>
            <input
              type="text"
              name="name"
              value={user}
              onChange={(e) => { setName(e.target.value) }}
              disabled={readonly}
            />
        </div>

        <div className="form-group">
            <label htmlFor="name">Subject</label>
            <input
              type="text"
              name="subject"
              value={subject}
              onChange={(e) => { setTicketSubject(e.target.value) }}
              disabled={readonly}
            />
        </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              value={ticketDescription}
              onChange={(e) => { setTicketDescription(e.target.value) }}
              disabled={readonly}
            />
        </div>

        <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              value={ticketCategory}
              onChange={(e) => setTicketCategory(e.target.value)}
              disabled={readonly}
            >
              <option>Hardware Issue</option>
              <option>Software Issue</option>
              <option>Feature Request</option>
              <option>HRL/Loaner Device Request</option>
              <option>Order Request</option>
              <option>Bug Report</option>
              <option>Other</option>
            </select>
        </div>

        <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              name="priority"
              value={ticketPriority}
              onChange={(e) => setTicketPriority(e.target.value)}
              
            >
              <option>LOW</option>
              <option>NORMAL</option>
              <option>HIGH</option>
            </select>
        </div>

        <div className="form-group">
            <label htmlFor="urgency">Urgency</label>
            <select
              name="urgency"
              value={ticketUrgency}
              onChange={(e) => setTicketUrgency(e.target.value)}
              
            >
              <option>LOW</option>
              <option>NORMAL</option>
              <option>HIGH</option>
            </select>
        </div>

          <div className="form-group">
            <label htmlFor="impact">Impact</label>
            <select
              name="impact"
              value={ticketImpact}
              onChange={(e) => setTicketImpact(e.target.value)}
              
            >
              <option>LOW</option>
              <option>NORMAL</option>
              <option>HIGH</option>
            </select>
        </div>


        <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              value={ticketStatus}
              onChange={(e) => setTicketStatus(e.target.value)}
              
            >
              <option>Open/In Progess</option>
              <option>Denied/Closed</option>
              <option>Resolved/Closed</option>
            </select>

             </div>
        <div className="form-group">
            <label htmlFor="technician">Technician</label>
            <input
              type="text"
              name="technician"
              value={ticketTech}
              onChange={(e) => { setTicketTech(e.target.value) }}
              
            />
        </div>

        <div className="form-group">
            <label htmlFor="createDate">Ticket Created/Updated</label>
            <input
              type="date"
              value={formatDate(createDate)}
              name="createDate"
              disabled
            />
         </div>

          <div className="button-group">
            <button
              className="button"
              style={{ width: "48%" }}
              onClick={() => {
                onSubmit(
                  id,
                  user, 
                  ticketSubject,
                  ticketDescription,
                  ticketCategory,
                  ticketImpact,
                  ticketPriority,
                  ticketUrgency,
                  ticketStatus,
                  ticketTech,
                  createDate,
                  new Date());
                alert("Ticket Submitted");
              }}
            >
              Submit
            </button>
            <button style={{ width: "50%" }} onClick={onClear}>
              Clear
            </button>
          </div>
        </div>
      </div>
    )
}
export default TicketSubmission;
