// Importing necessary libraries and data
import logo from './logo.svg';
import './App.css';
import { EmployeeData } from './EmployeData';
import { useEffect, useState } from 'react';

function App() {

  // Initializing state variables for employee data and form inputs
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState(0);
  const [id, setId] = useState(0); // Used for identifying the employee to be updated
  const [isUpdate, setIsUpdate] = useState(false); // Flag to check if we're updating an employee

  // Effect hook to load initial employee data from EmployeeData
  useEffect(() => {
    setData(EmployeeData); // Set the initial employee data from static EmployeeData
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  // Function to handle editing an employee
  const handleEdit = (id) => {
    const dt = data.filter(item => item.id === id); // Find the employee by ID
    if (dt !== undefined) {
      setIsUpdate(true); // Set isUpdate to true to indicate we're in the edit mode
      setId(id); // Set the ID of the employee we're editing
      setFirstName(dt[0].firstName); // Set the first name of the employee in form
      setLastName(dt[0].lastName); // Set the last name of the employee in form
      setAge(dt[0].age); // Set the age of the employee in form
    }
  };

  // Function to handle deleting an employee
  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure to delete this item")) { // Ask for confirmation before deleting
        const dt = data.filter(item => item.id !== id); // Remove the employee with the given ID
        setData(dt); // Update the state with the remaining employees
      }
    }
  };

  // Function to handle saving a new employee
  const handleSave = (e) => {
    let error = ''; // Variable to collect error messages for validation

    // Basic validation for empty fields
    if (firstName === '') error += 'First name is required, ';
    if (lastName === '') error += 'Last name is required, ';
    if (age <= 0) error += 'Age is required';

    // If no errors, save the new employee
    if (error === '') {
      e.preventDefault(); // Prevent form submission
      const dt = [...data]; // Copy the existing data
      const newObject = {
        id: EmployeeData.length + 1, // Assign a new ID (this could be improved to avoid conflicts)
        firstName: firstName, // Set the first name
        lastName: lastName, // Set the last name
        age: age // Set the age
      };
      dt.push(newObject); // Add the new employee to the data array
      setData(dt); // Update the state with the new list of employees
    } else {
      alert(error); // If there are validation errors, show an alert with the errors
    }
  };

  // Function to clear the form inputs
  const handleClear = () => {
    setId(0); // Reset the ID to 0
    setFirstName(''); // Clear the first name input
    setLastName(''); // Clear the last name input
    setAge(''); // Clear the age input
    setIsUpdate(false); // Reset the update flag to false
  };

  // Function to handle updating an existing employee
  const handleUpdate = () => {
    // Find the index of the employee to update
    const index = data.map((item) => {
      return item.id;
    }).indexOf(id); // Find the employee index based on ID

    const dt = [...data]; // Copy the data array to avoid direct mutation
    dt[index].firstName = firstName; // Update the first name of the employee
    dt[index].lastName = lastName; // Update the last name of the employee
    dt[index].age = age; // Update the age of the employee

    setData(dt); // Update the state with the modified data array
    handleClear(); // Clear the form fields after the update
  };

  return (
    <div className="App">

      {/* Form for inputting employee data */}
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
        <div>
          <label>First Name:
            <input type='text' placeholder='Enter First Name' onChange={(e) => setFirstName(e.target.value)} value={firstName} />
          </label>
        </div>
        <div>
          <label>Last Name:
            <input type='text' placeholder='Enter Last Name' onChange={(e) => setLastName(e.target.value)} value={lastName} />
          </label>
        </div>
        <div>
          <label>Age:
            <input type='number' placeholder='Enter Age' onChange={(e) => setAge(e.target.value)} value={age} />
          </label>
        </div>
        <div>
          {/* Save or Update button */}
          {
            !isUpdate ?
            <button className='btn btn-primary' onClick={(e) => handleSave(e)}>Save</button>  // Save new employee
            :
            <button className='btn btn-secondary' onClick={() => handleUpdate()}>Update</button> // Update existing employee
          }
          <button className='btn btn-danger' onClick={() => handleClear()}>Clear</button> {/* Clear form */}
        </div>
      </div>

      {/* Table displaying the list of employees */}
      <table className='table table-hover'>
        <thead>
          <tr>
            <td>Sr No</td>
            <td>ID</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Age</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.age}</td>
                  <td>
                    {/* Edit and Delete buttons */}
                    <button className='btn btn-primary' onClick={() => handleEdit(item.id)}>Edit</button>
                    <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>

    </div>
  );
}

export default App;
