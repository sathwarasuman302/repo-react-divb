import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const getUsers = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/get-user"
            );

            setUsers(response.data.data);

        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.errorMessage ||
                "Failed to get users"
            );

        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        getUsers();
    }, []);


    const handleDelete = async (user) => {

        if (!window.confirm(`Are you sure you want to delete ${user.name}?`)
        ) {
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:5000/api/delete-user/${user._id}`);

            if(response.data.data){
              getUsers()
            }

            alert("User deleted successfully");

        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.errorMessage ||
                "Failed to delete user"
            );
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 px-4 py-8">

            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                    <h1 className="text-2xl font-semibold text-gray-800">
                        User List
                    </h1>

                    <button
                        type="button"
                        onClick={() => navigate("/users/add")}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md"
                    >
                        + Add User
                    </button>

                </div>


                {loading ? (
                    <p className="text-center py-6">
                        Loading users...
                    </p>
                ) : (

                    <div className="overflow-x-auto">

                        <table className="min-w-full border border-gray-200">

                            <thead className="bg-gray-50">

                                <tr>

                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                                        #
                                    </th>

                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                                        Name
                                    </th>

                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                                        Email
                                    </th>

                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                                        Phone
                                    </th>

                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                                        Address
                                    </th>

                                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b">
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {users.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="px-4 py-6 text-center text-gray-500"
                                        >
                                            No users found
                                        </td>

                                    </tr>

                                ) : (

                                    users.map((user, index) => (

                                        <tr
                                            key={user._id}
                                            className="hover:bg-gray-50"
                                        >

                                            <td className="px-4 py-3 text-sm text-gray-700 border-b">
                                                {index + 1}
                                            </td>

                                            <td className="px-4 py-3 text-sm text-gray-700 border-b">
                                                {user.name}
                                            </td>

                                            <td className="px-4 py-3 text-sm text-gray-700 border-b">
                                                {user.email}
                                            </td>

                                            <td className="px-4 py-3 text-sm text-gray-700 border-b">
                                                {user.phone}
                                            </td>

                                            <td className="px-4 py-3 text-sm text-gray-700 border-b">
                                                {user.address}
                                            </td>

                                            <td className="px-4 py-3 text-sm border-b">

                                                <div className="flex justify-center gap-2">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            navigate(
                                                                `/users/edit/${user._id}`
                                                            )
                                                        }
                                                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDelete(user)
                                                        }
                                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
}

export default Dashboard;
