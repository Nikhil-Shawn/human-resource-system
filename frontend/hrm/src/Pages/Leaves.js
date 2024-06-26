import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Leaves.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import Sidebar from "../Components/Sidebar";
import HeaderComponent from "../Components/HeaderComponent";
import LeaveDrawer from "../Components/LeaveDrawer";

function Leaves() {
    const [vacations, setVacations] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [currentLeave, setCurrentLeave] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const dropdownRef = useRef(null);

    const fetchVacations = () => {
        axios.get("http://localhost:8080/api/vacations")
            .then((response) => {
                const data = response.data;
                const vacationsData = data.data.vacations;
                setVacations(vacationsData);
                console.log("Response data:", vacationsData);
            })
            .catch((error) => {
                console.error("Error fetching vacation data:", error);
            });
    };

    useEffect(() => {
        fetchVacations();
    }, []);

    const handleDrawerOpen = (leave) => {
        setIsDrawerOpen(true);
        setCurrentLeave(leave || null);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
        setCurrentLeave(null);
    };

    const handleSave = (newLeave) => {
        if (currentLeave) {
            setVacations(vacations.map(leave => leave.id === newLeave.id ? newLeave : leave));
            console.log("currentLeave= ", currentLeave);
        } else {
            setVacations([...vacations, newLeave]);
        }
        fetchVacations(); // Refresh the data after save
    };

    const handleDelete = (leaveId) => {
        axios.delete(`http://localhost:8080/api/vacations/deleteVacation/${leaveId}`)
            .then(response => {
                fetchVacations(); // Refresh the data after delete
            })
            .catch(error => {
                console.error('There was an error deleting the leave!', error);
            });
    };

    const toggleDropdown = (index) => {
        setDropdownOpen(dropdownOpen === index ? null : index);
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "Accepted":
                return { backgroundColor: "#DDFCE0", color: "#0EB01D" };
            case "NEW LEAVE":
                return { backgroundColor: "#FFF9C4", color: "#FF9800" };
            case "REJECTED":
                return { backgroundColor: "#F8D7DA", color: "#DC3545" };
            case "PENDING":
                return { backgroundColor: "#E0BBFF", color: "#6F42C1" };
            default:
                return { backgroundColor: "#E0E0E0", color: "#000000" };
        }
    };

    return (
        <div className="app">
            <Sidebar />
            <div className="main-content">
                <HeaderComponent />
                <div className="leaves-container">
                    <div className="leaves-heading">
                        <div className="leaves-text">Leaves</div>
                        <div className="add-leave-button-container">
                            <button onClick={() => handleDrawerOpen()}>+ Add Leave</button>
                        </div>
                    </div>

                    <table className="employee-table">
                        <thead>
                            <tr style={{ fontWeight: "0", fontSize: "0.8vw", color: "black" }}>
                                <th style={{ padding: "20px 0px 20px 40px", marginLeft: "10px" }}>ID</th>
                                <th>Reason</th>
                                <th>Leave Type</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody style={{ fontSize: "0.8vw", textAlign: "center" }}>
                            {vacations && vacations.map((vacation, index) => (
                                <tr key={index}>
                                    <td style={{ display: "flex", alignItems: "center", borderLeft: "1px solid #E0E4EA", padding: "20px" }}>
                                        <td>{vacation.vacationId} </td> 
                                    </td>
                                    <td>
                                        <span style={{ backgroundColor: "#DDCBFC", color: "black", borderRadius: "30px", padding: "8px 20px", display: "inline-block" }}>
                                            {vacation.reason}
                                        </span>
                                    </td>
                                    <td>{vacation.vacationType}</td>
                                    <td>{vacation.startDate}</td>
                                    <td>{vacation.endDate}</td>
                                    <td>
                                        <span style={{ ...getStatusStyle(vacation.status), borderRadius: "30px", padding: "8px 20px", display: "inline-block" }}>
                                            {vacation.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="dropdown-container" ref={dropdownOpen === index ? dropdownRef : null}>
                                            <BsThreeDotsVertical onClick={() => toggleDropdown(index)} />
                                            {dropdownOpen === index && (
                                                <div className="dropdown-menu">
                                                    <div className="dropdown-item" onClick={() => handleDrawerOpen(vacation)}>Edit</div>
                                                    <div className="dropdown-item" onClick={() => handleDelete(vacation.vacationId)}>Delete</div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <LeaveDrawer isOpen={isDrawerOpen} onClose={handleDrawerClose} onSave={handleSave} leave={currentLeave} />
        </div>
    );
}

export default Leaves;
