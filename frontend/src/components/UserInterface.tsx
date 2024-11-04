import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardComponent from './CardComponent';

// Define the structure of the User data
interface User {
  id: number;
  name: string;
  email: string;
}

// Define props for the component
interface UserInterfaceProps {
  backendName: string; // Backend name, e.g., 'go'
}

// Main component to display, create, update, and delete users
const UserInterface: React.FC<UserInterfaceProps> = ({ backendName }) => {
  // Set API URL with a default if environment variable is not provided
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://66dbf2c96722fdb9097e9de1_lb_705.bm-south.lab.poridhi.io';

  // State variables to manage user data, new user form, update user form, and error messages
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [updateUser, setUpdateUser] = useState({ id: '', name: '', email: '' });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch all users when component mounts or `backendName` changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/${backendName}/users`);
        setUsers(response.data.reverse()); // Reverse to show newest users first
      } catch (error) {
        setErrorMessage('Error fetching data. Please check the console.');
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [backendName, apiUrl]);

  // Function to create a new user
  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    setErrorMessage(null); // Reset error message

    try {
      const response = await axios.post(`${apiUrl}/api/${backendName}/users`, newUser);
      setUsers([response.data, ...users]); // Add new user to the top of the list
      setNewUser({ name: '', email: '' }); // Reset form fields
    } catch (error) {
      setErrorMessage('Error creating user. Please check the console.');
      console.error('Error creating user:', error);
    }
  };

  // Function to update an existing user
  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    setErrorMessage(null); // Reset error message

    try {
      // Send PUT request to update user data
      await axios.put(`${apiUrl}/api/${backendName}/users/${updateUser.id}`, {
        name: updateUser.name,
        email: updateUser.email,
      });
      setUpdateUser({ id: '', name: '', email: '' }); // Reset form fields after update
      setUsers(
        users.map((user) => 
          user.id === parseInt(updateUser.id) ? { ...user, name: updateUser.name, email: updateUser.email } : user
        )
      );
    } catch (error) {
      setErrorMessage('Error updating user. Please check the console.');
      console.error('Error updating user:', error);
    }
  };

  // Function to delete a user by their ID
  const deleteUser = async (userId: number) => {
    setErrorMessage(null); // Reset error message

    try {
      await axios.delete(`${apiUrl}/api/${backendName}/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId)); // Remove deleted user from the list
    } catch (error) {
      setErrorMessage('Error deleting user. Please check the console.');
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className={`user-interface w-full max-w-md p-4 my-4 rounded shadow`}>
      {/* Display an error message if any */}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {/* Form to add a new user */}
      <form onSubmit={createUser} className="mb-6 p-4 bg-blue-100 rounded shadow">
        <input
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="mb-2 w-full p-2 border border-gray-300 rounded"
        />
        <input
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="mb-2 w-full p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Add User
        </button>
      </form>

      {/* Display list of users with options to delete */}
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
            <CardComponent card={user} />
            <button onClick={() => deleteUser(user.id)} className="bg-red-500 text-white py-2 px-4 rounded">
              Delete User
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserInterface;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import CardComponent from './CardComponent';

// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

// interface UserInterfaceProps {
//   backendName: string; // 'go'
// }

// const UserInterface: React.FC<UserInterfaceProps> = ({ backendName }) => {
//   const apiUrl =
//     process.env.NEXT_PUBLIC_API_URL ||
//     'https://66dbf2c96722fdb9097e9de1_lb_705.bm-south.lab.poridhi.io/';
//   const [users, setUsers] = useState<User[]>([]);
//   const [newUser, setNewUser] = useState({ name: '', email: '' });
//   const [updateUser, setUpdateUser] = useState({ id: '', name: '', email: '' });

//   // Define styles based on the backend name
//   const backgroundColors: { [key: string]: string } = {
//     go: 'bg-cyan-500',
//   };

//   const buttonColors: { [key: string]: string } = {
//     go: 'bg-cyan-700 hover:bg-blue-600',
//   };

//   const bgColor =
//     backgroundColors[backendName as keyof typeof backgroundColors] ||
//     'bg-gray-200';
//   const btnColor =
//     buttonColors[backendName as keyof typeof buttonColors] ||
//     'bg-gray-500 hover:bg-gray-600';

//   // Fetch all users
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/api/${backendName}/users`);
//         setUsers(response.data.reverse());
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [backendName, apiUrl]);

//   // Create a new user
//   const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         `${apiUrl}/api/${backendName}/users`,
//         newUser
//       );
//       setUsers([response.data, ...users]);
//       setNewUser({ name: '', email: '' });
//     } catch (error) {
//       console.error('Error creating user:', error);
//     }
//   };

//   // Update a user
//   const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       await axios.put(
//         `${apiUrl}/api/${backendName}/users/${updateUser.id}`,
//         { name: updateUser.name, email: updateUser.email }
//       );
//       setUpdateUser({ id: '', name: '', email: '' });
//       setUsers(
//         users.map((user) => {
//           if (user.id === parseInt(updateUser.id)) {
//             return { ...user, name: updateUser.name, email: updateUser.email };
//           }
//           return user;
//         })
//       );
//     } catch (error) {
//       console.error('Error updating user:', error);
//     }
//   };

//   // Delete a user
//   const deleteUser = async (userId: number) => {
//     try {
//       await axios.delete(`${apiUrl}/api/${backendName}/users/${userId}`);
//       setUsers(users.filter((user) => user.id !== userId));
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   };

//   return (
//     <div className={`user-interface ${bgColor} w-full max-w-md p-6 my-4 rounded-xl shadow-lg transition-transform transform hover:scale-105`}>
//       <img
//         src={`/${backendName}logo.svg`}
//         alt={`${backendName} Logo`}
//         className="w-24 h-24 mb-6 mx-auto"
//       />
//       <h2 className="text-2xl font-bold text-center text-white mb-6">
//         {`${backendName.charAt(0).toUpperCase() + backendName.slice(1)} Backend`}
//       </h2>

//       {/* Create user */}
//       <form onSubmit={createUser} className="mb-6 p-4 bg-blue-100 rounded-lg shadow-md transition-transform transform hover:scale-105">
//         <input
//           placeholder="Name"
//           value={newUser.name}
//           onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
//           className="mb-2 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
//         />
//         <input
//           placeholder="Email"
//           value={newUser.email}
//           onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//           className="mb-2 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
//         />
//         <button
//           type="submit"
//           className="w-full p-2 text-white bg-cyan-600 rounded-lg shadow transition duration-200 hover:bg-cyan-500"
//         >
//           Add User
//         </button>
//       </form>

//       {/* Update user */}
//       <form onSubmit={handleUpdateUser} className="mb-6 p-4 bg-blue-100 rounded-lg shadow-md transition-transform transform hover:scale-105">
//         <input
//           placeholder="User Id"
//           value={updateUser.id}
//           onChange={(e) => setUpdateUser({ ...updateUser, id: e.target.value })}
//           className="mb-2 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
//         />
//         <input
//           placeholder="New Name"
//           value={updateUser.name}
//           onChange={(e) => setUpdateUser({ ...updateUser, name: e.target.value })}
//           className="mb-2 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
//         />
//         <input
//           placeholder="New Email"
//           value={updateUser.email}
//           onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })}
//           className="mb-2 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
//         />
//         <button
//           type="submit"
//           className="w-full p-2 text-white bg-green-600 rounded-lg shadow transition duration-200 hover:bg-green-500"
//         >
//           Update User
//         </button>
//       </form>

//       {/* Display users */}
//       <div className="space-y-4">
//         {users.map((user) => (
//           <div key={user.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow transition duration-200 hover:shadow-lg">
//             <CardComponent card={user} />
//             <button
//               onClick={() => deleteUser(user.id)}
//               className={`${btnColor} text-white py-2 px-4 rounded-lg shadow transition duration-200 hover:bg-red-600`}
//             >
//               Delete User
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UserInterface;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import CardComponent from './CardComponent';

// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

// interface UserInterfaceProps {
//   backendName: string; //go
// }
// declare global {
//   const myGlobalVariable: string;
//   interface MyGlobalInterface {
//     // ...
//   }
// }

// const UserInterface: React.FC<UserInterfaceProps> = ({ backendName }) => {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://66dbf2c96722fdb9097e9de1_lb_705.bm-south.lab.poridhi.io/';   //http://172.16.200.87:8000
//   const [users, setUsers] = useState<User[]>([]);
//   const [newUser, setNewUser] = useState({ name: '', email: '' });
//   const [updateUser, setUpdateUser] = useState({ id: '', name: '', email: '' });

//   // Define styles based on the backend name
//   const backgroundColors: { [key: string]: string } = {
//     go: 'bg-cyan-500',
//   };

//   const buttonColors: { [key: string]: string } = {
//     go: 'bg-cyan-700 hover:bg-blue-600',
//   };

//   const bgColor = backgroundColors[backendName as keyof typeof backgroundColors] || 'bg-gray-200';
//   const btnColor = buttonColors[backendName as keyof typeof buttonColors] || 'bg-gray-500 hover:bg-gray-600';

//   // Fetch all users
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/api/${backendName}/users`);
//         setUsers(response.data.reverse());
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [backendName, apiUrl]);

//   // Create a new user
//   const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(`${apiUrl}/api/${backendName}/users`, newUser);
//       setUsers([response.data, ...users]);
//       setNewUser({ name: '', email: '' });
//     } catch (error) {
//       console.error('Error creating user:', error);
//     }
//   };

//   // Update a user
//   const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       await axios.put(`${apiUrl}/api/${backendName}/users/${updateUser.id}`, { name: updateUser.name, email: updateUser.email });
//       setUpdateUser({ id: '', name: '', email: '' });
//       setUsers(
//         users.map((user) => {
//           if (user.id === parseInt(updateUser.id)) {
//             return { ...user, name: updateUser.name, email: updateUser.email };
//           }
//           return user;
//         })
//       );
//     } catch (error) {
//       console.error('Error updating user:', error);
//     }
//   };

//   // Delete a user
//   const deleteUser = async (userId: number) => {
//     try {
//       await axios.delete(`${apiUrl}/api/${backendName}/users/${userId}`);
//       setUsers(users.filter((user) => user.id !== userId));
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   }

//   return (
//     <div className={`user-interface ${bgColor} ${backendName} w-full max-w-md p-4 my-4 rounded shadow`}>
//       <img src={`/${backendName}logo.svg`} alt={`${backendName} Logo`} className="w-20 h-20 mb-6 mx-auto" />
//       <h2 className="text-xl font-bold text-center text-white mb-6">{`${backendName.charAt(0).toUpperCase() + backendName.slice(1)} Backend`}</h2>

//       {/* Create user */}
//       <form onSubmit={createUser} className="mb-6 p-4 bg-blue-100 rounded shadow">
//         <input
//           placeholder="Name"
//           value={newUser.name}
//           onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
//           className="mb-2 w-full p-2 border border-gray-300 rounded"
//         />
//         <input
//           placeholder="Email"
//           value={newUser.email}
//           onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//           className="mb-2 w-full p-2 border border-gray-300 rounded"
//         />
//         <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
//           Add User
//         </button>
//       </form>

//       {/* Update user */}
//       <form onSubmit={handleUpdateUser} className="mb-6 p-4 bg-blue-100 rounded shadow">
//       <input
//           placeholder="User Id"
//           value={updateUser.id}
//           onChange={(e) => setUpdateUser({ ...updateUser, id: e.target.value })}
//           className="mb-2 w-full p-2 border border-gray-300 rounded"
//         />
//         <input
//           placeholder="New Name"
//           value={updateUser.name}
//           onChange={(e) => setUpdateUser({ ...updateUser, name: e.target.value })}
//           className="mb-2 w-full p-2 border border-gray-300 rounded"
//         />
//         <input
//           placeholder="New Email"
//           value={updateUser.email}
//           onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })}
//           className="mb-2 w-full p-2 border border-gray-300 rounded"
//         />
//         <button type="submit" className="w-full p-2 text-white bg-green-500 rounded hover:bg-green-600">
//           Update User
//         </button>
//       </form>

//       {/* display users */}
//       <div className="space-y-4">
//         {users.map((user) => (
//           <div key={user.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
//             <CardComponent card={user} />
//             <button onClick={() => deleteUser(user.id)} className={`${btnColor} text-white py-2 px-4 rounded`}>
//               Delete User
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UserInterface;