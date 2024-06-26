import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import HeaderComponent from "../Components/HeaderComponent";
import "./CreateEmployee.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateEmployee() {
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [dob, setDob] = useState("");
    const [nationality, setNationality] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [maritalStatus, setMaritalStatus] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [dateOfJoining, setDateOfJoining] = useState("");
    const [dateOfTermination, setDateOfTermination] = useState("");
    const [workLocation, setWorkLocation] = useState("");
    const [designation, setDesignation] = useState("");
    const [employmentType, setEmploymentType] = useState("");
    const [manageWhom, setManageWhom] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isSupervisor, setIsSupervisor] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const handleSupervisorChange = (e) => {
        setIsSupervisor(e.target.checked);
    };

    const handleAdminChange = (e) => {
        setIsAdmin(e.target.checked);
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasMinLength = password.length >= 8;
        return hasUpperCase && hasLowerCase && hasNumber && hasMinLength;
    };

    const validateForm = () => {
        if (!firstname || !lastname || !dob || !nationality || !gender || !phone || !email || !password || !address || !maritalStatus || !departmentId || !dateOfJoining || !workLocation || !designation || !employmentType) {
            return false;
        }
        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return false;
        }
        if (!validatePassword(password)) {
            alert("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            alert("Please fill in all required fields and ensure email and password are valid.");
            return;
        }

        const employeeData = {
            firstName: firstname,
            lastName: lastname,
            address: address,
            personEmail: email,
            personPassword: password,
            phone: phone,
            dateOfBirth: dob,
            gender: gender,
            nationality: nationality,
            maritalStatus: maritalStatus,
            personType: "employee",
            departmentId: departmentId,
            isSupervisor: isSupervisor,
            manageWhom: manageWhom,
            employmentType: employmentType,
            isAdmin: isAdmin,
            empEmail: email,
            empPassword: password,
            designation: designation,
            hireDate: dateOfJoining,
            terminationDate: dateOfTermination,
            employmentStatus: "Active",
            workLocation: workLocation
        };

        try {
            const response = await axios.post("http://localhost:8080/api/v1/employee/save", employeeData);
            if (response.status === 200) {
                setSuccessMessage("Employee created successfully!");
                setTimeout(() => {
                    navigate("/add-education");
                }, 2000);
            } else {
                console.error("Failed to create employee:", response.status, response.data);
            }
        } catch (error) {
            console.error("Error creating employee:", error);
        }
    };

    return (
        <div className="app">
            <Sidebar />
            <div className="main-content">
                <HeaderComponent />
                <div className="employee-container">
                    <div className="save-button-container">
                        <div className="create-employee-text">Create Employee</div>
                        <div>
                            <button onClick={handleSubmit}>Save and continue</button>
                        </div>
                    </div>
                    {successMessage && (
                        <div className="success-message">
                            {successMessage}
                        </div>
                    )}
                    <div className="form-cont">
                        <form>
                            <div className="form-section-wrapper">
                                <div className="personal-info">
                                    <h3>Basic Information</h3>
                                    <input
                                        type="text"
                                        placeholder="Firstname"
                                        value={firstname}
                                        onChange={(e) => setFirstname(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Lastname"
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Phone number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                    <label>
                                        Date of Birth
                                        <input
                                            type="date"
                                            value={dob}
                                            onChange={(e) => setDob(e.target.value)}
                                            required
                                        />
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Gender"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Marital Status"
                                        value={maritalStatus}
                                        onChange={(e) => setMaritalStatus(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Nationality"
                                        value={nationality}
                                        onChange={(e) => setNationality(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Work location"
                                        value={workLocation}
                                        onChange={(e) => setWorkLocation(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="address-info">
                                    <h3>Employment Information</h3>

                                    <label>
                                        Joining Date
                                        <input
                                            type="date"
                                            value={dateOfJoining}
                                            onChange={(e) => setDateOfJoining(e.target.value)}
                                            required
                                        />
                                    </label>
                                    <label>
                                        Termination Date
                                        <input
                                            type="date"
                                            value={dateOfTermination}
                                            onChange={(e) => setDateOfTermination(e.target.value)}
                                        />
                                    </label>

                                    <input
                                        type="number"
                                        placeholder="Department ID"
                                        value={departmentId}
                                        onChange={(e) => setDepartmentId(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Designation"
                                        value={designation}
                                        onChange={(e) => setDesignation(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Employment Type"
                                        value={employmentType}
                                        onChange={(e) => setEmploymentType(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Manage whom"
                                        value={manageWhom}
                                        onChange={(e) => setManageWhom(e.target.value)}
                                        required
                                    />
                                    <div className="checkbox-container">
                                        <input
                                            type="checkbox"
                                            id="isSupervisor"
                                            checked={isSupervisor}
                                            onChange={handleSupervisorChange}
                                        />
                                        <label htmlFor="isSupervisor">Supervisor</label>
                                        <input
                                            className="adminCheckbox"
                                            type="checkbox"
                                            id="isAdmin"
                                            checked={isAdmin}
                                            onChange={handleAdminChange}
                                        />
                                        <label htmlFor="isAdmin">Admin</label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateEmployee;
