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
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);

    const payload = { 
        user_id: selectedUser,
        role_id: selectedRole,
        menu_items: menuItems
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      console.log('value', value);
      setSelectedUser(value);
    };
    
    const getUsers = async () => {  
        const response = await authService.getAllUser();
        if (response?.users) {
            setUsers(response.users);
        }
    };

    const getRoles = async () => {
        const response = await authService.getAllRole();
        if (response?.menus) {
            setRoles(response.menus);
        }
    };

    const getMenuItemsList = async () => {
            const response = await authService.getMenuItems();
            if (response?.menus) {
                setMenuItems(response.menus);
            }
        };  
    // const handleMenuChange = (item) => {
    //   setMenuItems((prev) => ({ ...prev, [item]: !prev[item] }));
    // };

    useEffect(() => {
        getMenuItemsList();
        getUsers();
        getRoles();
        }, []);
    

  return (
    <DefaultLayout>
    <>
      <Breadcrumb pageName="UserRole" />
    <div className="p-6 min-h-screen flex flex-col gap-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex gap-6 ">
        <div>
          <label className="font-semibold mr-2">Users</label>
          <select
            className="p-2 px-15 border rounded-md  dark:bg-boxdark"
            name='user_id'
            value={selectedUser}
            onChange={handleInputChange}
          >
            <option disabled value="">Select User</option>
            {users.map((user) => (
              <option
               key={user.user_id} 
                      value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-semibold mr-2">Roles</label>
          <select
            className="p-2 px-15 border rounded-md  dark:bg-boxdark"
            name='role_id'
            value={selectedRole}
            onChange={handleInputChange}
          >
            <option disabled value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.role_id} 
                      value={role.role_id}>
                {role.role_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <label className='font-bold' htmlFor="">Menu List</label>
        {menuItems.map((item) => (
          <div key={item.menu_id} className="flex flex-col">
            {/* Parent Menu */}
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={item.active_yn}
                className="w-4 h-4"
              />
              <span>{item.menu_name}</span>
            </label>
          </div>
        ))}

        {/* Submenus (if any) */}
        {menuItems.map((item) =>
          item.submenus && item.submenus.length > 0 ? (
            item.submenus.map((submenu) => (
              <div key={submenu.menu_id} className="pl-6 flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={submenu.active_yn}
                  className="w-4 h-4"
                />
                <span>{submenu.menu_name}</span>
              </div>
            ))
          ) : null
        )}
      </div>

    </div>
           
           <ToastContainer />
      
    </>
    </DefaultLayout>
  );
};

export default UserRole;
