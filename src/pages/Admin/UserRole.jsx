import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import React, { useState, useEffect } from 'react';
import authService from '../Authentication/AuthService';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


const UserRole = () => {
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [menuItems, setMenuItems] = useState([]);


    const getMenuItemsList = async () => {
            const response = await authService.getMenuItems();
            if (response?.menus) {
                setMenuItems(response.menus);
            }
        };  
    const handleMenuChange = (item) => {
      setMenuItems((prev) => ({ ...prev, [item]: !prev[item] }));
    };

    useEffect(() => {
        getMenuItemsList();
        }, []);
    

  return (
    <DefaultLayout>
    <>
      <Breadcrumb pageName="UserRole" />
    <div className="p-6 min-h-screen flex flex-col gap-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex gap-6 ">
        <div>
          <label className="font-semibold">Users</label>
          <select
            className="p-2 border rounded-md"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">Select User</option>
            <option value="user1">User 1</option>
            <option value="user2">User 2</option>
          </select>
        </div>
        <div>
          <label className="font-semibold">Roles</label>
          <select
            className="p-2 border rounded-md"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
          </select>
        </div>
      </div>

      <div className="border p-4 rounded-md shadow-md">
        <h3 className="font-semibold">Menu List</h3>
        <div className="flex flex-col gap-2 mt-2">
          {menuItems.map((item) => (
            <label key={item} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={item.active_yn}
                onChange={() => handleMenuChange(item.id)}
                className="w-4 h-4"
              />
              <span>{item.menu_name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
           
           <ToastContainer />
      
    </>
    </DefaultLayout>
  );
};

export default UserRole;
